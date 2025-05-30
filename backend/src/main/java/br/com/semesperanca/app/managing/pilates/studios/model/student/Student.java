package br.com.semesperanca.app.managing.pilates.studios.model.student;


import org.springframework.data.mongodb.core.mapping.Document;

import br.com.semesperanca.app.managing.pilates.studios.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Document(collection = "Usuarios")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder

public class Student extends User {

    @NonNull
    private Assessment assessment;

    @NonNull
    private Plan plan;

    private ClientArea clientArea;

    @NonNull
    private String progress;

}
