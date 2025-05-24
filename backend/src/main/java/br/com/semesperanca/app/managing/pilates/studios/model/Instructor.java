package br.com.semesperanca.app.managing.pilates.studios.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Document(collection = "Usuarios")
public class Instructor extends User {

    @Id
    private String id;
    
    @NonNull
    private String formation;
    @NonNull
    private String advice;
    @NonNull
    private List<String> permissions;

}