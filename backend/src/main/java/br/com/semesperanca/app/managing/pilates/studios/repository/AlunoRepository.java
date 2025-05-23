package br.com.semesperanca.app.managing.pilates.studios.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import br.com.semesperanca.app.managing.pilates.studios.model.Aluno;

public interface AlunoRepository extends MongoRepository<Aluno, String> {

}
