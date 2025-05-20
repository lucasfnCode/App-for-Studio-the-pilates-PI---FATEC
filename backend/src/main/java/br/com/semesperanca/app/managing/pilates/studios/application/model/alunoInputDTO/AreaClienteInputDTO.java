package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoInputDTO;

import java.time.LocalDate;
import java.util.List;

public record AreaClienteInputDTO(
    LocalDate dataVencimentoPagamento,
    Integer reposicoes,
    List<AulaAgendadaInputDTO> proximasAulas,
    String meuPlano,
    String comprovantePagamento,
    String reciboFiscal,
    String contrato,
    Boolean autorizacaoImagem
) {}
