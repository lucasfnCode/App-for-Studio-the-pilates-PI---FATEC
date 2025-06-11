package br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO;

import java.time.LocalDate;
import java.util.List;

public record StudentInputDTO(
    String name,
    List<String> role,
    String cpf,
    LocalDate birthDate,
    String email,
    String contact,
    String photo,
    AssessmentInputDTO assessment,
    String progress,
    PlanStudentInputDTO plan,
    ClientAreaInputDTO clientArea,
    Boolean isActive
) {}
