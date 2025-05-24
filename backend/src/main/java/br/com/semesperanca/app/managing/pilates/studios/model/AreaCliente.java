package br.com.semesperanca.app.managing.pilates.studios.model;


import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class AreaCliente {
    private LocalDate dataVencimentoPagamento;
    private int reposicoes;
    private List<ProximaAula> proximasAulas;
    private String meuPlano;
    private String comprovantePagamento;
    private String reciboFiscal;
    private String contrato;
    private boolean autorizacaoImagem;
}

