package br.com.semesperanca.app.managing.pilates.studios.service.security;

import br.com.semesperanca.app.managing.pilates.studios.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TokenService {

    private final String secret = "secret";

    public String generateToken(User user) {

        List<String> roles = user.getRoles().stream().map(Enum::toString).collect(Collectors.toList());

        return JWT.create()
                .withIssuer("Managing Pilates")
                .withSubject(user.getCpf())
                .withClaim("id", user.getId())
                .withClaim("name", user.getName())
                .withClaim("roles", roles)
                .withExpiresAt(
                        Date.from(
                                LocalDateTime.now()
                                        .plusMinutes(30)
                                        .toInstant(ZoneOffset.of("-03:00"))
                        )
                )
                .sign(Algorithm.HMAC256(secret));
    }

    public String getSubject(String token) {
        return JWT.require(Algorithm.HMAC256(secret))
                .withIssuer("Managing Pilates")
                .build()
                .verify(token)
                .getSubject();
    }
}
