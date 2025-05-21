package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PlanoInputDTO(
    @JsonProperty("modalidade") String modalidade,
    @JsonProperty("frequencia") String frequencia,
    @JsonProperty("duracao") String duracao,
    @JsonProperty("dataInicio") LocalDate dataInicio,
    @JsonProperty("formaPagamento") String formaPagamento,
    @JsonProperty("desconto") String desconto,
    @JsonProperty("tipoPagamento") String tipoPagamento,
    @JsonProperty("dataPrimeiroPagamento") LocalDate dataPrimeiroPagamento,
    @JsonProperty("dataVencimento") LocalDate dataVencimento
) {}
