package br.com.semesperanca.app.managing.pilates.studios.application.model;

import br.com.semesperanca.app.managing.pilates.studios.model.Role;

import java.time.LocalDate;
import java.util.Set;

public record InstructorOutputDTO(

    String id,
    String name,
    Set<Role> role,
    String cpf,
    LocalDate birthDate,
    String email,
    String contact,
    String photo,
    String formation,
    String advice,
    LocalDate hiringDate,
    Boolean isActive

) {}
