package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.util.List;

public record SessionOutputDTO(

    String id,
    List<String> students,
    String studio,
    String instructor,
    List<String> day,
    List<String> hours,
    String status,
    String type,
    Boolean isActive

) {}
