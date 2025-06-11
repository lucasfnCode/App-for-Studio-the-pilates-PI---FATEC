package br.com.semesperanca.app.managing.pilates.studios.service;

import org.springframework.stereotype.Service;

import br.com.semesperanca.app.managing.pilates.studios.model.session.SessionStatus;
import br.com.semesperanca.app.managing.pilates.studios.application.model.session.SessionInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.session.SessionOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.session.Session;
import br.com.semesperanca.app.managing.pilates.studios.model.studio.DaysOfWeek;
import br.com.semesperanca.app.managing.pilates.studios.model.studio.Schedules;
import br.com.semesperanca.app.managing.pilates.studios.model.studio.Studio;
import br.com.semesperanca.app.managing.pilates.studios.repository.StudioRepository;
import br.com.semesperanca.app.managing.pilates.studios.repository.SessionRepository;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final StudioRepository studioRepository;

    public List<SessionOutputDTO> listAllActiveSessions() {
        List<Session> sessions = sessionRepository.findAll().stream()
                .filter(i -> Boolean.TRUE.equals(i.getIsActive()))
                .toList();
        return sessions.stream().map(this::assemblerSessionOutputDTO).toList();
    }

    public List<SessionOutputDTO> listAllSessions() {
        List<Session> sessions = sessionRepository.findAll()
                .stream()
                .toList();
        return sessions.stream().map(this::assemblerSessionOutputDTO).toList();

    }

    public SessionOutputDTO listSessionById(String id) {
        Optional<Session> optionalsession = sessionRepository.findById(id);
        Session session = optionalsession.get();
        return assemblerSessionOutputDTO(session);
    }

    /*
     * public List<SessionOutputDTO> listAllCurrentSessions() {
     * LocalDate today = LocalDate.now();
     * List<Session> sessions = sessionRepository.findByDayGreaterThanEqual(today);
     * return sessions.stream()
     * .map(this::assemblerSessionOutputDTO)
     * .collect(Collectors.toList());
     * }
     */

    public List<SessionOutputDTO> listAllCurrentSessionsWithDayLimiter() {
        LocalDate today = LocalDate.now();
        LocalDate nextWeek = today.plusDays(7);

        List<Session> sessions = sessionRepository.findByIsActive(Boolean.TRUE);

        List<Session> filtered = sessions.stream()
                .filter(s -> !s.getDay().isBefore(today) && !s.getDay().isAfter(nextWeek))
                .collect(Collectors.toList());

        return filtered.stream()
                .map(this::assemblerSessionOutputDTO)
                .collect(Collectors.toList());
    }

    public List<SessionOutputDTO> listSessionByDay(LocalDate date) {
        List<Session> sessions = sessionRepository.findByIsActive(Boolean.TRUE);

        List<Session> filtered = sessions.stream()
                .filter(s -> s.getDay().equals(date))
                .collect(Collectors.toList());

        return filtered.stream()
                .map(this::assemblerSessionOutputDTO)
                .collect(Collectors.toList());
    }

    public List<SessionOutputDTO> listSessionByStudentId(String studentId) {
        List<Session> sessions = sessionRepository.findByStudents(studentId);
        return sessions.stream()
                .map(this::assemblerSessionOutputDTO)
                .toList();
    }

    public List<SessionOutputDTO> listSessionByInstructor(String id) {
        List<Session> sessions = sessionRepository.findByInstructor(id);
        return sessions.stream()
                .map(this::assemblerSessionOutputDTO)
                .toList();
    }

    public SessionOutputDTO openSession(SessionInputDTO sessionInputDTO) {
        if (!checkMaxOfStudents(sessionInputDTO)) {
            throw new RuntimeException("caguei no mato");
        }
        if (!checkIfInstructorIsAvalible(sessionInputDTO)) {
            throw new RuntimeException("xereca mole");
        }
        if (!checkIfStudioIsInOperatingDay(sessionInputDTO)) {
            throw new RuntimeException("pinto molenga");
        }
        if (!checkIfSheduleIsAvaliable(sessionInputDTO)) {
            throw new RuntimeException("suruba no acre");
        }
        return assemblerSessionOutputDTO(sessionRepository.save(assemblerSessionEntity(sessionInputDTO)));
    }

    public SessionOutputDTO updateSessionById(String id, SessionInputDTO sessionInputDTO) {
        Optional<Session> optionalsession = sessionRepository.findById(id);
        if (optionalsession.isEmpty()) {
            throw new RuntimeException("Session não encontrada");
        }
        if (!checkMaxOfStudents(sessionInputDTO)) {
            throw new RuntimeException("caguei no mato");
        }
        if (!checkIfInstructorIsAvalible(sessionInputDTO)) {
            throw new RuntimeException("xereca mole");
        }
        if (!checkIfStudioIsInOperatingDay(sessionInputDTO)) {
            throw new RuntimeException("pinto molenga");
        }
        if (!checkIfSheduleIsAvaliable(sessionInputDTO)) {
            throw new RuntimeException("suruba no acre");
        }

        Session session = optionalsession.get();
        Schedules hours = Schedules.fromHorario(sessionInputDTO.hours());
        SessionStatus status = SessionStatus.fromDescricao(sessionInputDTO.status());

        session.setStudents(sessionInputDTO.students());
        session.setStudio(sessionInputDTO.studio());
        session.setInstructor(sessionInputDTO.instructor());
        session.setDay(sessionInputDTO.day());
        session.setHours(hours);
        session.setStatus(status);
        session.setPresences(sessionInputDTO.presences());
        session.setType(sessionInputDTO.type());
        session.setIsActive(sessionInputDTO.isActive());

        Session updated = sessionRepository.save(session);
        return assemblerSessionOutputDTO(updated);

    }

    public SessionOutputDTO registerStudentInSession(String studentId, String sessionId) {
        Optional<Session> optionalsession = sessionRepository.findById(sessionId);
        Session session = optionalsession.get();

        List<String> currentStudents = session.getStudents();

        if (!currentStudents.contains(studentId)) {
            currentStudents.add(studentId);
        }

        session.setStudents(currentStudents);

        Session updated = sessionRepository.save(session);
        return assemblerSessionOutputDTO(updated);

    }

    public SessionOutputDTO unregisterStudentFromSession(String studentId, String sessionId) {
        Optional<Session> optionalsession = sessionRepository.findById(sessionId);
        Session session = optionalsession.get();

        List<String> students = session.getStudents();
        if (students.contains(studentId)) {
            students.remove(studentId);
        } else {
            throw new RuntimeException();
        }

        session.setStudents(students);
        Session updated = sessionRepository.save(session);
        return assemblerSessionOutputDTO(updated);
    }

    public SessionOutputDTO registerPresencesInSession(List<String> studentIds, String sessionId) {
        Optional<Session> optionalsession = sessionRepository.findById(sessionId);
        Session session = optionalsession.get();

        List<String> currentPresences = session.getPresences();

        for (String id : studentIds) {
            if (!currentPresences.contains(id)) {
                currentPresences.add(id);
            }
        }

        session.setPresences(currentPresences);
        Session updated = sessionRepository.save(session);
        return assemblerSessionOutputDTO(updated);

    }

    public SessionOutputDTO unregisterPresencesInSession(List<String> studentIds, String sessionId) {
        Optional<Session> optionalsession = sessionRepository.findById(sessionId);
        Session session = optionalsession.get();

        List<String> currentPresences = session.getPresences();

        for (String id : studentIds) {
            if (currentPresences.contains(id)) {
                currentPresences.remove(id);
            }
        }

        session.setPresences(currentPresences);
        Session updated = sessionRepository.save(session);
        return assemblerSessionOutputDTO(updated);

    }

    public SessionOutputDTO desactiveSessionById(String id) {
        Optional<Session> optionalsession = sessionRepository.findById(id);
        Session session = optionalsession.get();

        session.setIsActive(Boolean.FALSE);

        Session updated = sessionRepository.save(session);
        return assemblerSessionOutputDTO(updated);

    }

    private Boolean checkIfSheduleIsAvaliable(SessionInputDTO sessionInputDTO) {
        String studioName = sessionInputDTO.studio();

        Optional<Studio> optionalStudio = studioRepository.findByName(studioName);
        if (optionalStudio.isEmpty()) {
            throw new RuntimeException("Estúdio não encontrado: " + studioName);
        }

        Studio studio = optionalStudio.get();
        List<Schedules> unavailableSchedules = studio.getUnavailableTimes();
        Schedules hours = Schedules.fromHorario(sessionInputDTO.hours());

        if (unavailableSchedules.contains(hours)) {
            return false;
        }

        return true;

    }

    private Boolean checkIfStudioIsInOperatingDay(SessionInputDTO sessionInputDTO) {
        String studioName = sessionInputDTO.studio();

        Optional<Studio> optionalStudio = studioRepository.findByName(studioName);
        if (optionalStudio.isEmpty()) {
            throw new RuntimeException("Estúdio não encontrado: " + studioName);
        }

        Studio studio = optionalStudio.get();
        List<DaysOfWeek> diasFuncionamento = studio.getDaysOperation();

        DaysOfWeek diaDaSessao = DaysOfWeek.fromJavaDayOfWeek(sessionInputDTO.day().getDayOfWeek());

        return diasFuncionamento.contains(diaDaSessao);
    }

    private Boolean checkIfInstructorIsAvalible(SessionInputDTO sessionInputDTO) {
        String studioName = sessionInputDTO.studio();
        String instructorName = sessionInputDTO.instructor();

        Optional<Studio> optionalStudio = studioRepository.findByName(studioName);
        if (optionalStudio.isEmpty()) {
            throw new RuntimeException("Estúdio não encontrado: " + studioName);
        }

        Studio studio = optionalStudio.get();
        Map<Schedules, String> instructorsByTime = studio.getInstructorsByTime();

        Schedules hours = Schedules.fromHorario(sessionInputDTO.hours());

        String instructorAtTime = instructorsByTime.get(hours);
        if (instructorAtTime != null && !instructorAtTime.equals(instructorName)) {
            return false;
        }

        return true;
    }

    private Boolean checkMaxOfStudents(SessionInputDTO sessionInputDTO) {
        String studioName = sessionInputDTO.studio();
        Optional<Studio> optionalStudio = studioRepository.findByName(studioName);
        Studio studio = optionalStudio.get();
        List<String> session = sessionInputDTO.students();

        if (session.size() > studio.getLimitStudentsPerClass()) {
            return false;
        }

        return true;

    }

    private SessionOutputDTO assemblerSessionOutputDTO(Session session) {
        String hours = session.getHours().getValor();
        String status = SessionStatus.toDescricao(session.getStatus());
        return new SessionOutputDTO(
                session.getId(),
                session.getStudents(),
                session.getStudio(),
                session.getInstructor(),
                session.getDay(),
                hours,
                status,
                session.getPresences(),
                session.getType(),
                session.getIsActive());
    }

    private Session assemblerSessionEntity(SessionInputDTO sessionInputDTO) {
        Schedules hours = Schedules.fromHorario(sessionInputDTO.hours());
        SessionStatus status = SessionStatus.fromDescricao(sessionInputDTO.status());
        return new Session(
                sessionInputDTO.students(),
                sessionInputDTO.studio(),
                sessionInputDTO.instructor(),
                sessionInputDTO.day(),
                hours,
                status,
                sessionInputDTO.presences(),
                sessionInputDTO.type(),
                sessionInputDTO.isActive());
    }

}