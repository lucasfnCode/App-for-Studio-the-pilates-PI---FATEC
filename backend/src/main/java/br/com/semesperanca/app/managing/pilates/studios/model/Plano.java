package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class Plano {
    private String modalidade;
    private String frequencia;
    private String duracao;
    private LocalDate dataInicio;
    private String formaPagamento;
    private String desconto;
    private String tipoPagamento;
    private LocalDate dataPrimeiroPagamento;
    private LocalDate dataVencimento;
}
