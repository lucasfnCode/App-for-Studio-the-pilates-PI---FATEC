package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoOutputDTO;

import java.time.LocalDate;

public record AreaClienteOutputDTO(
    LocalDate dataVencimentoPagamento,
    Integer reposicoes,
    String comprovantePagamento,
    String reciboFiscal,
    String contrato,
    Boolean autorizacaoImagem
) 
{}

