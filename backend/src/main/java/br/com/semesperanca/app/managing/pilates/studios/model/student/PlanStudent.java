package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class PlanStudent {

    @Id
    private String idPlan;

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

    private Boolean isActive;

}
