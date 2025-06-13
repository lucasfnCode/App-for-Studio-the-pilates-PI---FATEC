package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import br.com.semesperanca.app.managing.pilates.studios.application.model.UserLoginDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.UserLoginOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.model.User;
import br.com.semesperanca.app.managing.pilates.studios.service.security.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/login")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final TokenService tokenService;

    @PostMapping
    public ResponseEntity<UserLoginOutputDTO> login(@RequestBody UserLoginDTO userLoginDTO) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginDTO.username(), userLoginDTO.password());

        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        User user = (User) authentication.getPrincipal();

        String token = tokenService.generateToken(user);

        return ResponseEntity.ok(new UserLoginOutputDTO(token));

    }
}
