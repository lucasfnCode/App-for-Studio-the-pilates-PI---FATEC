package br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO;

import br.com.semesperanca.app.managing.pilates.studios.model.Role;

import java.time.LocalDate;
import java.util.List;

public record StudentInputDTO(
    String name,
    List<Role> role,
    String cpf,
    LocalDate birthDate,
    String email,
    String contact,
    String photo,
    AssessmentInputDTO assessment,
    String progress,
    PlanStudentInputDTO plan,
    ClientAreaInputDTO clientArea,
    Boolean isActive,
    String password
) {}
