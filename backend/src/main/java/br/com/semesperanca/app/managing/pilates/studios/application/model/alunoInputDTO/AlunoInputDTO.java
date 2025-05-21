package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
public record AlunoInputDTO(
    @JsonProperty("nome") String nome,
    @JsonProperty("tipo") String tipo,
    @JsonProperty("dataNascimento") LocalDate dataNascimento,
    @JsonProperty("email") String email,
    @JsonProperty("contato") String contato,
    @JsonProperty("foto") String foto,
    @JsonProperty("avaliacao") AvaliacaoInputDTO avaliacao,
    String evolucao,
    @JsonProperty("plano") PlanoInputDTO plano,
    @JsonProperty("areaCliente") AreaClienteInputDTO areaCliente,
    Boolean isActive
) {}
