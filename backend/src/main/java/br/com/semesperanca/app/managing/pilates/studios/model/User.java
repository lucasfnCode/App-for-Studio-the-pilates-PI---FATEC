package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import lombok.NonNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public abstract class User {

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

}