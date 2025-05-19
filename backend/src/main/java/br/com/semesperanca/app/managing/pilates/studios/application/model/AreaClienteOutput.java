package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.time.LocalDate;
import java.util.List;

public record AreaClienteOutput(
    LocalDate data_vencimento_pagamento,
    Integer reposicoes,
    List<AulaAgendadaOutput> proximas_aulas,
    String meu_plano,
    String comprovante_pagamento,
    String recibo_fiscal,
    String contrato,
    Boolean autorizacao_imagem
) {}

