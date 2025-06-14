package br.com.semesperanca.app.managing.pilates.studios.repository.user;

import br.com.semesperanca.app.managing.pilates.studios.model.student.Student;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends UserBaseRepository<Student> {
    List<Student> findByIdIn(List<String> ids);
}
