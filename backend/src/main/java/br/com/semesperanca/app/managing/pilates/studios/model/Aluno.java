package br.com.semesperanca.app.managing.pilates.studios.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document (collection = "Usuario")


//criar uma classe abstrata chamada "User" e extende-la 
//nos demais usuarios
@Data 
public class Aluno {
    
    @Id
    private String id;
    private String nome;
    private String email;
}
