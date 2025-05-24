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

    public SessionOutputDTO openSession(SessionInputDTO sessionInputDTO) {
        if(!checkIfStudioIsOperatingByDay(sessionInputDTO)){
            throw new RuntimeException();
        }
        if (!checkMaxOfStudents(sessionInputDTO)) {
            throw new RuntimeException();
        }
        if (!checkIfInstructorIsAvalible(sessionInputDTO)) {
            throw new RuntimeException();
        }
        return assemblerSessionOutputDTO(sessionRepository.save(assemblerSessionEntity(sessionInputDTO)));
    }

    private Boolean checkIfStudioIsOperatingByDay(SessionInputDTO sessionInputDTO) {
    String studioName = sessionInputDTO.studio();
    List<String> daysRequested = sessionInputDTO.day();

    Optional<Studio> optionalStudio = studioRepository.findByName(studioName);
    if (optionalStudio.isEmpty()) {
        throw new RuntimeException("Estúdio não encontrado: " + studioName);
    }

    Studio studio = optionalStudio.get();

    List<String> activeDays = studio.getDaysOperation().stream()
            .map(DaysOfWeek::toDescricao)
            .toList();

    for (String dayRequested : daysRequested) {
        if (!activeDays.contains(dayRequested)) {
            return false;
        }
    }

    return true;
}


    private Boolean checkIfInstructorIsAvalible(SessionInputDTO sessionInputDTO) {
        String studioName = sessionInputDTO.studio();
        String instructorName = sessionInputDTO.instructor();
        List<String> hoursToCheck = sessionInputDTO.hours();

        Optional<Studio> optionalStudio = studioRepository.findByName(studioName);
        if (optionalStudio.isEmpty()) {
            throw new RuntimeException("Estúdio não encontrado: " + studioName);
        }

        Studio studio = optionalStudio.get();
        Map<Schedules, String> instructorsByTime = studio.getInstructorsByTime();

        List<Schedules> scheduleHours = hoursToCheck.stream()
                .map(Schedules::fromHorario)
                .toList();

        for (Schedules schedule : scheduleHours) {
            String instructorAtTime = instructorsByTime.get(schedule);
            if (instructorAtTime != null && !instructorAtTime.equals(instructorName)) {
                return false;
            }
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
        List<String> day = session.getDay().stream()
                .map(DaysOfWeek::toDescricao)
                .toList();
        List<String> hours = session.getHours().stream().map(Schedules::getValor).toList();
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
        List<DaysOfWeek> day = sessionInputDTO.day().stream()
                .map(DaysOfWeek::fromDescricao)
                .toList();
        List<Schedules> hours = sessionInputDTO.hours().stream().map(Schedules::fromHorario).toList();
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
