package br.com.semesperanca.app.managing.pilates.studios.model.student;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import br.com.semesperanca.app.managing.pilates.studios.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Document(collection = "Usuarios")
@Data
@NoArgsConstructor

public class Student extends User {

    @NonNull
    @Field("avaliacao")
    private Assessment assessment;

    @NonNull
    @Field("plano")
    private Plan plan;

    @Field("area_cliente")
    private ClientArea clientArea;

    @NonNull
    @Field("evolucao")
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
