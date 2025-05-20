package br.com.semesperanca.app.managing.pilates.studios.model.aluno;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import br.com.semesperanca.app.managing.pilates.studios.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;

@Document (collection = "Usuarios")


//criar uma classe abstrata chamada "User" e extende-la 
//nos demais usuarios
@Data 
@AllArgsConstructor

public class Aluno extends Usuario {
    private Avaliacao avaliacao;
    private Plano plano;
    private AreaCliente areaCliente;

}
