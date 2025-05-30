package br.com.semesperanca.app.managing.pilates.studios.application.model.Session;

import java.time.LocalDate;
import java.util.List;

public record SessionOutputDTO(

                String id,
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
