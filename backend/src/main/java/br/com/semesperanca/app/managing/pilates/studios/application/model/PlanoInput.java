package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.time.LocalDate;

public record PlanoInput(
    String modalidade,
    String frequencia,
    String duracao,
    LocalDate data_inicio,
    String forma_pagamento,
    String desconto,
    String tipo_pagamento,
    LocalDate data_primeiro_pagamento,
    LocalDate data_vencimento
) {}
