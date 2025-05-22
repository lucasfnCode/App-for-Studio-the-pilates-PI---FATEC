package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO;

import java.time.LocalDate;

public record AreaClienteInputDTO(

    LocalDate dataVencimentoPagamento,
    Integer reposicoes,
    String comprovantePagamento,
    String reciboFiscal,
    String contrato,
    Boolean autorizacaoImagem
    
) {}
