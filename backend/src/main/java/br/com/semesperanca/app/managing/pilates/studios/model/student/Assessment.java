package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Assessment {

    @NonNull
    private String description;

    @NonNull
    private String professional;

    @NonNull
    private String posturalPhoto;

    @NonNull
    private String relevantData;

}
