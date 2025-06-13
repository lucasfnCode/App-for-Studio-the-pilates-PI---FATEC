package br.com.semesperanca.app.managing.pilates.studios.application.security;

import br.com.semesperanca.app.managing.pilates.studios.service.security.TokenService;
import br.com.semesperanca.app.managing.pilates.studios.service.security.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@AllArgsConstructor
public class FilterToken extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserService userService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

/*        String path = request.getRequestURI();

        if (path.equals("/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }*/

//        if (SecurityContextHolder.getContext().getAuthentication() == null) {
        String token;
        String headerAuthorization = request.getHeader("Authorization");

        if (headerAuthorization != null) {
            token = headerAuthorization.replace("Bearer ", "");
            String subject = tokenService.getSubject(token);

            UserDetails user = userService.loadUserByUsername(subject);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
//        }


        filterChain.doFilter(request, response);

    }
}
