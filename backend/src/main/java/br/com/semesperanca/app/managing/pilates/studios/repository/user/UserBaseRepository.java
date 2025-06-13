package br.com.semesperanca.app.managing.pilates.studios.repository.user;

import br.com.semesperanca.app.managing.pilates.studios.model.Role;
import br.com.semesperanca.app.managing.pilates.studios.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserBaseRepository<T extends User> extends MongoRepository<T, String> {
    Optional<T> findByCpf(String cpf);
    List<T> findByRolesContaining(Role role);
}
