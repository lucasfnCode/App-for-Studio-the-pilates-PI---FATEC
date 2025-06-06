package br.com.semesperanca.app.managing.pilates.studios.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import br.com.semesperanca.app.managing.pilates.studios.model.Plan;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRepository extends MongoRepository<Plan, String>{

}
