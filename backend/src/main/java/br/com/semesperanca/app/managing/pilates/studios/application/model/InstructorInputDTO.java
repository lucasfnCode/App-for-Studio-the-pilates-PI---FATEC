package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.util.List;

public record InstructorInputDTO(

    String formation,
    String advice,
    String hiring_date,
    List<String> permissions,
    Boolean isActive

) {}
