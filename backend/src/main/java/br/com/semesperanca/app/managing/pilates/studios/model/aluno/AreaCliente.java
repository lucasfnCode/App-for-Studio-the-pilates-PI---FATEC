package br.com.semesperanca.app.managing.pilates.studios.model.aluno;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AreaCliente {

    @Field("data_vencimento_pagamento")
    private LocalDate dataVencimentoPagamento;

    private int reposicoes;

    @Field("comprovante_pagamento")
    private String comprovantePagamento;

    @Field("recibo_fiscal")
    private String reciboFiscal;

    private String contrato;
    
    @Field("autorizacao_imagem")
    private Boolean autorizacaoImagem;
}

