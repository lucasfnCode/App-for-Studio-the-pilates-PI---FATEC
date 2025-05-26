package br.com.semesperanca.app.managing.pilates.studios.service;

import org.springframework.stereotype.Service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.SessionInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.SessionOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.session.SessionStatus;
import br.com.semesperanca.app.managing.pilates.studios.model.session.Session;
import br.com.semesperanca.app.managing.pilates.studios.model.studio.DaysOfWeek;
import br.com.semesperanca.app.managing.pilates.studios.model.studio.Schedules;
import br.com.semesperanca.app.managing.pilates.studios.model.studio.Studio;
import br.com.semesperanca.app.managing.pilates.studios.repository.StudioRepository;
import br.com.semesperanca.app.managing.pilates.studios.repository.SessionRepository;
import lombok.AllArgsConstructor;

import java.util.*;

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

    public List<SessionOutputDTO> listAllSessions(){
        List<Session> sessions = sessionRepository.findAll()
            .stream()
            .toList();
        return sessions.stream().map(this::assemblerSessionOutputDTO).toList();
     
    }

    public SessionOutputDTO listSessionById(String id){
        Optional<Session> optionalsession = sessionRepository.findById(id);
        Session sesseion = optionalsession.get();
        return assemblerSessionOutputDTO(sesseion);
    }

    public SessionOutputDTO openSession(SessionInputDTO sessionInputDTO) {
        if (!checkMaxOfStudents(sessionInputDTO)) {
            throw new RuntimeException("caguei no mato");
        }
        if (!checkIfInstructorIsAvalible(sessionInputDTO)) {
            throw new RuntimeException();
        }
        if (!checkIfStudioIsInOperatingDay(sessionInputDTO)) {
            throw new RuntimeException();
        }
        if (!checkIfSheduleIsAvaliable(sessionInputDTO)){
            throw new RuntimeException();
        }
        return assemblerSessionOutputDTO(sessionRepository.save(assemblerSessionEntity(sessionInputDTO)));
    }

    public SessionOutputDTO updateSessionById(String id, SessionInputDTO sessionInputDTO){
        Optional<Session> optionalsession = sessionRepository.findById(id);
        if (optionalsession.isEmpty()){
            throw new RuntimeException("Session não encontrada");
        }
        if (!checkMaxOfStudents(sessionInputDTO)) {
            throw new RuntimeException();
        }
        if (!checkIfInstructorIsAvalible(sessionInputDTO)) {
            throw new RuntimeException();
        }
        if (!checkIfStudioIsInOperatingDay(sessionInputDTO)) {
            throw new RuntimeException();
        }
        if (!checkIfSheduleIsAvaliable(sessionInputDTO)){
            throw new RuntimeException();
        }

        Session session = optionalsession.get();
        DaysOfWeek day = DaysOfWeek.fromDescricao(sessionInputDTO.day());
        Schedules hours = Schedules.fromHorario(sessionInputDTO.hours());
        SessionStatus status = SessionStatus.fromDescricao(sessionInputDTO.status());

        session.setStudents(sessionInputDTO.students());
        session.setStudio(sessionInputDTO.studio());
        session.setInstructor(sessionInputDTO.instructor());
        session.setDay(day);
        session.setHours(hours);
        session.setStatus(status);
        session.setType(sessionInputDTO.type());
        session.setIsActive(sessionInputDTO.isActive());
        
        Session updated = sessionRepository.save(session);
        return assemblerSessionOutputDTO(updated);

    }

    public SessionOutputDTO desactiveSessionById(String id){
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

        List<String> activeDays = studio.getDaysOperation().stream()
                .map(DaysOfWeek::toDescricao)
                .toList();

            if (!activeDays.contains(sessionInputDTO.day())) {
                return false;
            }

        return true;
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
        String day = DaysOfWeek.toDescricao(session.getDay());
        String hours = session.getHours().getValor();
        String status = SessionStatus.toDescricao(session.getStatus());
        return new SessionOutputDTO(
                session.getId(),
                session.getStudents(),
                session.getStudio(),
                session.getInstructor(),
                day,
                hours,
                status,
                session.getType(),
                session.getIsActive());
    }

    private Session assemblerSessionEntity(SessionInputDTO sessionInputDTO) {
        DaysOfWeek day = DaysOfWeek.fromDescricao(sessionInputDTO.day());
        Schedules hours = Schedules.fromHorario(sessionInputDTO.hours());
        SessionStatus status = SessionStatus.fromDescricao(sessionInputDTO.status());
        return new Session(
                sessionInputDTO.students(),
                sessionInputDTO.studio(),
                sessionInputDTO.instructor(),
                day,
                hours,
                status,
                sessionInputDTO.type(),
                sessionInputDTO.isActive());
    }

}
