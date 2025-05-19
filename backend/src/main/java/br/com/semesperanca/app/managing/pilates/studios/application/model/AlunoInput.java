package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.time.LocalDate;

public record AlunoInput(
    String nome,
    String tipo,
    LocalDate data_nascimento,
    String email,
    String contato,
    String foto,
    AvaliacaoInput avaliacao,
    String evolucao,
    ReavaliacaoInput reavaliacao,
    PlanoInput plano,
    AreaClienteInput areaCliente,
    Boolean isActive
) {}
