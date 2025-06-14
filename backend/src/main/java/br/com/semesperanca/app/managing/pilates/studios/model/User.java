package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Set;

@Document(collection = "Usuarios")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public abstract class User implements UserDetails {

    @Id
    private String id;

    @NonNull
    private String name;

    @NonNull
    private Set<Role> roles;

    @NonNull
    private String cpf;

    @NonNull
    private LocalDate birthDate;

    @NonNull
    private String email;

    @NonNull
    private String contact;

    @NonNull
    private String photo;

    @NonNull
    private Boolean isActive;

    private String password;

}