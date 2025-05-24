package br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO;

import java.time.LocalDate;

public record StudentInputDTO(
    String name,
    String role,
    String cpf,
    LocalDate birthDate,
    String email,
    String contact,
    String photo,
    AssessmentInputDTO assessment,
    String progress,
    PlanInputDTO plan,
    ClientAreaInputDTO clientArea,
    Boolean isActive
) {}
