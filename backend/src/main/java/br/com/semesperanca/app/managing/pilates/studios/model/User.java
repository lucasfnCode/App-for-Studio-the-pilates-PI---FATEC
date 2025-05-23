package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import java.time.LocalDate;

@RequiredArgsConstructor
@NoArgsConstructor
@Data
public abstract class User {

    @NonNull
    private String name;
    @NonNull
    private String type;
    @NonNull
    private LocalDate hiringDate;
    @NonNull
    private String email;
    @NonNull
    private String contact;
    @NonNull
    private String photo;
    @NonNull
    private Boolean isActive;

}