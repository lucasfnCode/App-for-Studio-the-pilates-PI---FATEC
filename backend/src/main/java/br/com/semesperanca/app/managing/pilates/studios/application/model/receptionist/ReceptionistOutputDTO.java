package br.com.semesperanca.app.managing.pilates.studios.application.model.receptionist;

import java.time.LocalDate;
import java.util.Set;

import br.com.semesperanca.app.managing.pilates.studios.model.Role;

public record ReceptionistOutputDTO(

    String id,
    String name,
    Set<Role> role,
    String cpf,
    LocalDate birthDate,
    String email,
    String contact,
    String photo,
    LocalDate hiringDate,
    Boolean isActive

) {

}
