package br.com.semesperanca.app.managing.pilates.studios.repository;

import br.com.semesperanca.app.managing.pilates.studios.model.studio.Studio;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface StudioRepository extends MongoRepository<Studio, String> {
    /**
     * Encontra um estúdio pelo nome, mas apenas se ele estiver ativo.
     *
     * @param name O nome do estúdio a ser buscado.
     * @param isActive O status de ativação (deve ser true).
     * @return um Optional contendo o estúdio ativo, se encontrado.
     */
    Optional<Studio> findByNameAndIsActive(String name, Boolean isActive);
}