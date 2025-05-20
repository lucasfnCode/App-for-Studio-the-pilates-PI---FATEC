package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO;

import java.time.LocalDate;

public record AlunoInputDTO(
    String nome,
    String tipo,
    LocalDate dataNascimento,
    String email,
    String contato,
    String foto,
    AvaliacaoInputDTO avaliacao,
    String evolucao,
    PlanoInputDTO plano,
    AreaClienteInputDTO areaCliente,
    Boolean isActive
) {}
