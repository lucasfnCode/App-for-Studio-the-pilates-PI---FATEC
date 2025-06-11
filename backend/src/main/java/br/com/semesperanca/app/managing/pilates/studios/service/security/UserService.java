package br.com.semesperanca.app.managing.pilates.studios.service.security;

import br.com.semesperanca.app.managing.pilates.studios.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDetails getUserByCpf(String cpf) {
        return userRepository.findByCpf(cpf).orElseThrow();
    }
}
