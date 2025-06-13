package br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO;

import br.com.semesperanca.app.managing.pilates.studios.model.Role;

import java.time.LocalDate;
import java.util.List;

public record StudentOutputDTO (
        String id,
        String name,
        List<Role> roles,
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
