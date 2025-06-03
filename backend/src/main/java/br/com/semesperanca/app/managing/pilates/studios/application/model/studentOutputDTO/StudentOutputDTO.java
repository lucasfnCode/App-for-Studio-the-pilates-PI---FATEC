package br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO;

import java.time.LocalDate;

public record StudentOutputDTO (
    String id,
    String name,
    String role,
    String cpf,
    LocalDate birthDate,
    String email,
    String contact,
    String photo,
    AssessmentOutputDTO assessment,
    String progress,
    PlanStudentOutputDTO plan,
    ClientAreaOutputDTO clientArea,
    Boolean isActive
) {}
