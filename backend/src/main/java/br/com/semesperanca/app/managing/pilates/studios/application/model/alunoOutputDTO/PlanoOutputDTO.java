package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoOutputDTO;

import java.time.LocalDate;

public record PlanoOutputDTO(
    String modalidade,
    String frequencia,
    String duracao,
    LocalDate dataInicio,
    String formaPagamento,
    String desconto,
    String tipoPagamento,
    LocalDate dataPrimeiroPagamento,
    LocalDate dataVencimento
) {}
