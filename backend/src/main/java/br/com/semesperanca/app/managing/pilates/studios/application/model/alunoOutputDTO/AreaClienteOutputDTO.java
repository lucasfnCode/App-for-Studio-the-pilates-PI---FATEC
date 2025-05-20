package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoOutputDTO;

import java.time.LocalDate;
import java.util.List;

public record AreaClienteOutputDTO(
    LocalDate dataVencimentoPagamento,
    Integer reposicoes,
    List<AulaAgendadaOutputDTO> proximasAulas,
    String meulano,
    String comprovantePagamento,
    String reciboFiscal,
    String contrato,
    Boolean autorizacaoImagem
) 
{}

