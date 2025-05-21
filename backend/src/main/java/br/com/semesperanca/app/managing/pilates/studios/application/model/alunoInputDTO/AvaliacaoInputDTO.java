package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AvaliacaoInputDTO(
    @JsonProperty("descricao") String descricao, 
    @JsonProperty("profissional") String profissional,
    @JsonProperty("fotoPostural") String fotoPostural,
    @JsonProperty("dadosRelevantes") String dadosRelevantes
     ) {}
