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

    /**
     * Encontra todas as sessoes ativas em que um aluno está registrado.
     * O Spring Data MongoDB criará a consulta para encontrar documentos
     * onde o array 'students' contém o 'studentId' e o campo 'isActive' é true.
     *
     * @param studentId o ID do aluno.
     * @param isActive  o status da sessão (true para ativa).
     * @return uma lista de sessoes ativas para o aluno.
     */
    List<Session> findByStudentsAndIsActive(String studentId, Boolean isActive);

}