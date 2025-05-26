package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public abstract class User {

    private String name;
    private String type;
    private LocalDate hiringDate;
    private String email;
    private String contact;
    private String photo;
    private Boolean isActive;

}