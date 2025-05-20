package br.com.semesperanca.app.managing.pilates.studios.model.aluno;


import lombok.Data;
import java.time.LocalDate;
import java.util.List;
@Data
public class AreaCliente {

    private LocalDate dataVencimentoPagamento;
    private int reposicoes;
    private String comprovantePagamento;
    private String reciboFiscal;
    private String contrato;
    private Boolean autorizacaoImagem;
}

