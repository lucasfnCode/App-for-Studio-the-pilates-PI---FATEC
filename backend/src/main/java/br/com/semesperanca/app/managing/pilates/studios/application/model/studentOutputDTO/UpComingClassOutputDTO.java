package br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO;

import java.time.LocalTime;

import java.time.LocalDate;

public record UpComingClassOutputDTO(
    LocalDate date,
    LocalTime time,
    String status
) {}