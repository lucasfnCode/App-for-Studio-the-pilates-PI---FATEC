package br.com.semesperanca.app.managing.pilates.studios.application.model.receptionist;

import java.time.LocalDate;
import java.util.List;

import br.com.semesperanca.app.managing.pilates.studios.model.Role;

public record ReceptionistInputDTO(

        String name,
        List<Role> roles,
        String cpf,
        LocalDate birthDate,
        String email,
        String contact,
        String photo,
        LocalDate hiringDate,
        Boolean isActive,
        String password
) {
}
