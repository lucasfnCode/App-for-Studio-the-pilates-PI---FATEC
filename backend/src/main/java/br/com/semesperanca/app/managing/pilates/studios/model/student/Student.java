package br.com.semesperanca.app.managing.pilates.studios.model.student;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import br.com.semesperanca.app.managing.pilates.studios.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;


@Document(collection = "Usuarios")
@Getter
@Setter
@NoArgsConstructor

public class Student extends User {

    @NonNull
    private Assessment assessment;

    @NonNull
    private Plan plan;

    private ClientArea clientArea;

    @NonNull
    private String progress;

    public Student(
            String name,
            String role,
            String cpf,
            LocalDate birthDate,
            String email,
            String contact,
            String photo,
            Boolean isActive,
            Assessment assessment,
            Plan plan,
            ClientArea clientArea,
            String progress) {
        super(name, role, cpf, birthDate, email, contact, photo, isActive);
        this.assessment = assessment;
        this.plan = plan;
        this.clientArea = clientArea;
        this.progress = progress;
    }
}
