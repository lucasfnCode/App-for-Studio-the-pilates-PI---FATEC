package br.com.semesperanca.app.managing.pilates.studios.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Aulas")

public class Session {

    @Id
    private String id;

    @NonNull
    private List<String> students;
    @NonNull
    private String studio;
    @NonNull
    private String instructor;
    /*
    @NonNull
    private String date;
    @NonNull
    private String schedule;
    */
    @NonNull
    private String status;
    @NonNull
    private String type;
    @NonNull
    private Boolean isActive;

}
