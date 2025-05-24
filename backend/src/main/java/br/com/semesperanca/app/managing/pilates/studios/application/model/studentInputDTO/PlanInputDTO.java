package br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO;

import java.time.LocalDate;

public record PlanInputDTO(
    String modality,
    String frequency,
    String duration,
    LocalDate startDate,
    String paymentMethod,
    String discount,
    String paymentType,
    LocalDate firstPaymentDate,
    LocalDate dueDate
) {}
