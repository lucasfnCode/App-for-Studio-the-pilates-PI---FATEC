package br.com.semesperanca.app.managing.pilates.studios.model;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "alunos")


//criar uma classe abstrata chamada "User" e extende-la 
//nos demais usuarios
  
public class Aluno {
    @Id
    
    private String id;
    private String nome;
    private String email;
    private List<String> agendamentos; 

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getAgendamentos() {
        return this.agendamentos;
    }

    public void setAgendamentos(List<String> agendamentos) {
        this.agendamentos = agendamentos;
    }

    

}
