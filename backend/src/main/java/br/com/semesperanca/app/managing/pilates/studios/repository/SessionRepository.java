package br.com.semesperanca.app.managing.pilates.studios.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import br.com.semesperanca.app.managing.pilates.studios.model.session.Session;


@Repository
public interface SessionRepository extends MongoRepository<Session, String> {

}