package br.com.semesperanca.app.managing.pilates.studios.model.student;

import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Assessment {

    @NonNull
    @Field("descricao")
    private String description;

    @NonNull
    @Field("profissional")
    private String professional;

    @NonNull
    @Field("foto_postural")
    private String posturalPhoto;

    @NonNull
    @Field("dados_relevantes")
    private String relevantData;

}
