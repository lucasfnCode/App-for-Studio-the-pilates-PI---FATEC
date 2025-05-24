package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.NonNull;
import java.time.LocalDate;

@Getter
@Setter
@SuperBuilder

public abstract class User {

    @NonNull
    @Id
    private String id;

    @NonNull
    @Field("nome")
    private String name;

    @NonNull
    @Field("tipo")
    private String role;

    @NonNull
    private String cpf;

    @NonNull
    @Field("data_nascimento")
    private LocalDate birthDate;

    @NonNull
    @Field("email")
    private String email;

    @NonNull
    @Field("contato")
    private String contact;

    @NonNull
    @Field("foto")
    private String photo;

    @NonNull
    @Field("is_Active")
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
