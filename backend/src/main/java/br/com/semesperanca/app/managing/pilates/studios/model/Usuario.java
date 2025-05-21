package br.com.semesperanca.app.managing.pilates.studios.model;


import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Getter
@Setter
@SuperBuilder

public abstract class Usuario {

    @Id
    private String id;
    private String nome;
    private String tipo;
    @Field("data_nascimento")
    private LocalDate dataNascimento;
    private String email;
    private String contato;
    private String foto;
    @Field("is_active")
    private Boolean isActive;

    public Usuario() {
    
    } 
    
    public Usuario(String nome, String tipo, LocalDate dataNascimento, String email, String contato, String foto, Boolean isActive) {
        this.nome = nome;
        this.tipo = tipo;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.contato = contato;
        this.foto = foto;
        this.isActive = isActive;
    }
}

