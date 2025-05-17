package br.com.semesperanca.app.managing.pilates.studios.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "Usuarios")

@Data
public class Instrutor {

    @Id

    private String id;
    private String nome;
    private String tipo;
    private String formacao;
    private String conselho;
    private String email;
    private String data_nascimento;
    private String contato;
    private String data_contratacao;
    private String foto;
    private String permissoes;

}