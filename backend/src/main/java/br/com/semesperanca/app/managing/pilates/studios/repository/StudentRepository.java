package br.com.semesperanca.app.managing.pilates.studios.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.semesperanca.app.managing.pilates.studios.model.student.Student;

import java.util.List;
import java.util.Optional;


public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student>findByRole(String role);
    Optional<Student>findByCpf(String cpf);
    List<Student>findByIdIn(List <String> id);
}
