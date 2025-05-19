package br.com.semesperanca.app.managing.pilates.studios.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import br.com.semesperanca.app.managing.pilates.studios.model.Aluno;
import java.util.List;


public interface AlunoRepository extends MongoRepository<Aluno, String> {
    List<Aluno> findByTipo(String tipo);

}
