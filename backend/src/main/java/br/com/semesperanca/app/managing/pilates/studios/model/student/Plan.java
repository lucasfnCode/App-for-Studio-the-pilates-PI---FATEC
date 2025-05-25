package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Plan {

    @NonNull
    private String modality;

    @NonNull
    private String frequency;

    @NonNull
    private String duration;

    @NonNull
    private LocalDate startDate;

    @NonNull
    private String paymentMethod;

    @NonNull
    private String discount;

    @NonNull
    private String paymentType;

    @NonNull
    private LocalDate firstPaymentDate;

    @NonNull
    private LocalDate dueDate;

}
