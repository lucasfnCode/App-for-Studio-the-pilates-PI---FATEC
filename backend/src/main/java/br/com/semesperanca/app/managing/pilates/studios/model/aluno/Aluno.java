package br.com.semesperanca.app.managing.pilates.studios.model.aluno;


import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import br.com.semesperanca.app.managing.pilates.studios.model.Usuario;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document (collection = "Usuarios")

//criar uma classe abstrata chamada "User" e extende-la 
//nos demais usuarios
@Data
@NoArgsConstructor

public class Aluno extends Usuario {
    
    private Avaliacao avaliacao;
    private Plano plano;

    
    @Field("area_cliente")
    private AreaCliente areaCliente;

    private String evolucao;

     public Aluno(
        String nome,
        String tipo,
        LocalDate dataNascimento,
        String email,
        String contato,
        String foto,
        Boolean isActive,
        Avaliacao avaliacao,
        Plano plano,
        AreaCliente areaCliente,
        String evolucao
    ) {
        super(nome, tipo, dataNascimento, email, contato, foto, isActive);
        this.avaliacao = avaliacao;
        this.plano = plano;
        this.areaCliente = areaCliente;
        this.evolucao = evolucao;
    }

}
