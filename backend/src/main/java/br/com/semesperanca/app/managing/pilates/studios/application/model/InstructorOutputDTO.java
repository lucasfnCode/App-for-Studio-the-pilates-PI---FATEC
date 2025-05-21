package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.util.List;

public record InstructorOutputDTO(

    String id,
    String formation,
    String advice,
    String hiring_date,
    List<String> permissions

) {}
