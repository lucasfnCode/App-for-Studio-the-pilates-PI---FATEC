package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.time.LocalDate;
import java.util.List;

public record InstructorOutputDTO(

    String id,
    String name,
    String role,
    String cpf,
    LocalDate birthDate,
    String email,
    String contact,
    String photo,
    String formation,
    String advice,
    LocalDate hiringDate,
    List<String> permissions,
    Boolean isActive

) {}
