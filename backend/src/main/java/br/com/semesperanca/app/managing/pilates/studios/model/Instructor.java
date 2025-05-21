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
@Document(collection = "Usuarios")
public class Instructor {

    @Id
    private String id;
    
    @NonNull
    private String formation;
    @NonNull
    private String advice;
    @NonNull
    private String hiring_date;
    @NonNull
    private List<String> permissions;
    @NonNull
    private Boolean isActive;

}