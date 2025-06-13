package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UpComingClass {

    @NonNull
    private LocalDate date;

    @NonNull
    private LocalTime time;

    @NonNull
    private String status;
}