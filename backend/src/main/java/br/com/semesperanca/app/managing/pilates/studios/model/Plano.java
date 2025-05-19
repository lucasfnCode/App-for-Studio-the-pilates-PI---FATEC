package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class Plano {
    private String modalidade;
    private String frequencia;
    private String duracao;
    private LocalDate data_inicio;
    private String forma_pagamento;
    private String desconto;
    private String tipo_pagamento;
    private LocalDate data_primeiro_pagamento;
    private LocalDate data_vencimento;
}
