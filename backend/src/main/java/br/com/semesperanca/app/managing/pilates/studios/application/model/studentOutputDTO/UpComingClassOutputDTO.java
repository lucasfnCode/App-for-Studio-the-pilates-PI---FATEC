package br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO;

import java.time.LocalDate;
import java.time.LocalTime;

public record UpComingClassOutputDTO(
    LocalDate date,
    LocalTime time,
    String status
) {}