package br.com.semesperanca.app.managing.pilates.studios.repository;

import br.com.semesperanca.app.managing.pilates.studios.model.session.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface SessionRepository extends MongoRepository<Session, String> {
    List<Session> findByStudents(String studentId);
    List<Session> findByDay(LocalDate day);
    List<Session> findByIsActive(Boolean isActive);
    List<Session> findByInstructor(String instructor);

}