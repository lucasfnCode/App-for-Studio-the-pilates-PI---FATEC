package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.util.List;

public record SessionInputDTO(

    List<String> students,
    String studio,
    String instructor,
    /* 
    Adicionar o date e schodule
    */
    String status,
    String type,
    Boolean isActive

) {}
