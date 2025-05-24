package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ProximaAula {
    private LocalDate data;
    private String horario;
    private String status;
}

