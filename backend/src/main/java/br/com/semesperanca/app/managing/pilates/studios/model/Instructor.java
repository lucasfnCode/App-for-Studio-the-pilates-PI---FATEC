package br.com.semesperanca.app.managing.pilates.studios.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Document(collection = "Usuarios")
public class Instructor extends User {

    @Id
    private String id;
    
   
    private String formation;
    private String advice;
    private List<String> permissions;

}