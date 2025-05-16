package br.com.semesperanca.app.managing.pilates.studios.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "Usuarios")
public abstract class Usuario {

    @Id
    private String id;

    private String nome;
    private String tipo;
    private LocalDate dataNascimento;
    private String email;
    private String contato;
    private String foto;

    // private Avaliacao avaliacao;
    // private String evolucao;
    // private Reavaliacao reavaliacao;
    // private Plano plano;
    // private AreaCliente areaCliente;

}

