package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Getter;
import lombok.Setter;

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
