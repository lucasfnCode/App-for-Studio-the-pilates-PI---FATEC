package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AreaClienteInputDTO(
    @JsonProperty("dataVencimentoPagamento") LocalDate dataVencimentoPagamento,
    @JsonProperty("reposicoes") Integer reposicoes,
    @JsonProperty("comprovantePagamento") String comprovantePagamento,
    @JsonProperty("reciboFiscal") String reciboFiscal,
    @JsonProperty("contrato") String contrato,
    @JsonProperty("autorizacaoImagem") Boolean autorizacaoImagem
) {}
