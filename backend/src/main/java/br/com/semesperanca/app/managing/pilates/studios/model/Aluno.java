package br.com.semesperanca.app.managing.pilates.studios.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document (collection = "Usuarios")


//criar uma classe abstrata chamada "User" e extende-la 
//nos demais usuarios
@Data 
public class Aluno extends Usuario {
    
    private Avaliacao avaliacao;
    private Reavaliacao reavaliacao;
    private Plano plano;
    private AreaCliente area_cliente;
}
