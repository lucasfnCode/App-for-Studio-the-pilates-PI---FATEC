package br.com.semesperanca.app.managing.pilates.studios.application.model.Session;

import java.time.LocalDate;
import java.util.List;

public record SessionInputDTO(

        List<String> students,
        String studio,
        String instructor,
        LocalDate day,
        String hours,
        String status,
<<<<<<< HEAD
=======
        List<String> presences,
>>>>>>> origin/felps-session
        String type,
        Boolean isActive

) {
}
