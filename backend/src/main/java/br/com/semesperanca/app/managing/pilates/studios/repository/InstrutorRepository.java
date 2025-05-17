package br.com.semesperanca.app.managing.pilates.studios.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import br.com.semesperanca.app.managing.pilates.studios.model.Instrutor;
import java.util.List;


public interface InstrutorRepository extends MongoRepository<Instrutor, String> {
    List<Instrutor> findByTipo(String tipo);
}


