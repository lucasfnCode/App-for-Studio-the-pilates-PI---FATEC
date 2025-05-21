package br.com.semesperanca.app.managing.pilates.studios.model.aluno;

import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Avaliacao {
    private String descricao;
    private String profissional;

    @Field("foto_postural")
    private String fotoPostural;

    @Field("dados_relevantes")
    private String dadosRelevantes;
}

