package br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO;

import java.time.LocalDate;
import java.time.LocalTime;

public record UpComingClassInputDTO(
    LocalDate date,
    LocalTime time,
    String status
) 
{}
