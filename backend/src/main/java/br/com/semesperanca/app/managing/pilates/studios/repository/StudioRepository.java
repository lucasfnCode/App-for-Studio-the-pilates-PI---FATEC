package br.com.semesperanca.app.managing.pilates.studios.repository;

import br.com.semesperanca.app.managing.pilates.studios.model.studio.Studio;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudioRepository extends MongoRepository<Studio, String> {
    Optional<Studio> findByName(String name);
}
