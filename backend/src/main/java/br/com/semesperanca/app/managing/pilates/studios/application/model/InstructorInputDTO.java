package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.time.LocalDate;
import java.util.List;

public record InstructorInputDTO(

    String name,
    String type,
    LocalDate hiringDate,
    String email,
    String contact,
    String photo,
    String formation,
    String advice,
    List<String> permissions,
    Boolean isActive

) {}
