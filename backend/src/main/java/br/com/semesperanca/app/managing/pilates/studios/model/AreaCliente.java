package br.com.semesperanca.app.managing.pilates.studios.model;


import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class AreaCliente {
    private LocalDate data_vencimento_pagamento;
    private int reposicoes;
    private List<ProximaAula> proximas_aulas;
    private String meu_plano;
    private String comprovante_pagamento;
    private String recibo_fiscal;
    private String contrato;
    private boolean autorizacao_imagem;
}

