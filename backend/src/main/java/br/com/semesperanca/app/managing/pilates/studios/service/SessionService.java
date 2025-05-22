package br.com.semesperanca.app.managing.pilates.studios.service;

import org.springframework.stereotype.Service;

import br.com.semesperanca.app.managing.pilates.studios.application.model.SessionInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.SessionOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.Session;
import br.com.semesperanca.app.managing.pilates.studios.repository.SessionRepository;
import lombok.AllArgsConstructor;

import java.util.*;

@AllArgsConstructor
@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    public List<SessionOutputDTO> listAllActiveSessions(){
        List<Session> sessions = sessionRepository.findAll().stream()
            .filter(i -> Boolean.TRUE.equals(i.getIsActive()))
            .toList();
        return sessions.stream().map(this::assemblerSessionOutputDTO).toList();
    }

    public SessionOutputDTO openSession(SessionInputDTO sessionInputDTO){
        return assemblerSessionOutputDTO(sessionRepository.save(assemblerSessionEntity(sessionInputDTO)));
    }

    private SessionOutputDTO assemblerSessionOutputDTO(Session session){
        return new SessionOutputDTO(
            session.getId(),
            session.getStudents(),
            session.getStudio(),
            session.getInstructor(),
            session.getStatus(),
            session.getType(),
            session.getIsActive()
        );
    }

    private Session assemblerSessionEntity(SessionInputDTO sessionInputDTO){
        return new Session(
            sessionInputDTO.students(),
            sessionInputDTO.studio(),
            sessionInputDTO.instructor(),
            sessionInputDTO.status(),
            sessionInputDTO.type(),
            sessionInputDTO.isActive()
        );
    }

}
