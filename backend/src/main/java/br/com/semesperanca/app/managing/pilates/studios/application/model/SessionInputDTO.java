package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.util.List;

public record SessionInputDTO(

    List<String> students,
    String studio,
    String instructor,
    String day,
    String hours,
    String status,
    String type,
    Boolean isActive

) {}
