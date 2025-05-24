package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public abstract class User {

    private String name;
    private String type;
    private LocalDate hiringDate;
    private String email;
    private String contact;
    private String photo;
    private Boolean isActive;

}