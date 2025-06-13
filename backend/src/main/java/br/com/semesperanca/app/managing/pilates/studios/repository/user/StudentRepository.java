package br.com.semesperanca.app.managing.pilates.studios.repository.user;

import br.com.semesperanca.app.managing.pilates.studios.model.student.Student;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends UserBaseRepository<Student> {
}
