package br.com.semesperanca.app.managing.pilates.studios.application.model.session;

import java.time.LocalDate;
import java.util.List;

public record SessionInputDTO(

        List<String> students,
        String studio,
        String instructor,
        LocalDate day,
        String hours,
        String status,
        List<String> presences,
        String type,
        Boolean isActive

) {
}
