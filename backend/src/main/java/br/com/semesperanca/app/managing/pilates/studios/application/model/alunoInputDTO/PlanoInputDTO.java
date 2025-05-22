package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO;

import java.time.LocalDate;


public record PlanoInputDTO(
    
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
