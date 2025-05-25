package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.experimental.SuperBuilder;

import org.springframework.data.annotation.Id;
import lombok.NonNull;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@SuperBuilder

public abstract class User {

    @NonNull
    @Id
    private String id;

    @NonNull
    private String name;

    @NonNull
    private String role;

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

    public User() {
    }

    public User(String name, String role, String cpf, LocalDate birthDate, String email, String contact, String photo,
            Boolean isActive) {
        this.name = name;
        this.role = role;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.contact = contact;
        this.photo = photo;
        this.isActive = isActive;
    }
}
