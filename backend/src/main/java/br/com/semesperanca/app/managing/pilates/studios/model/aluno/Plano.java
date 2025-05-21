package br.com.semesperanca.app.managing.pilates.studios.model.aluno;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Plano {

    private String modalidade;
    private String frequencia;
    private String duracao;

    @Field("data_inicio")
    private LocalDate dataInicio;

    @Field("forma_pagamento")
    private String formaPagamento;

    private String desconto;

    @Field("tipo_pagamento")
    private String tipoPagamento;

    @Field("data_primeiro_pagamento")
    private LocalDate dataPrimeiroPagamento;

    @Field("data_vencimento")
    private LocalDate dataVencimento;
}
