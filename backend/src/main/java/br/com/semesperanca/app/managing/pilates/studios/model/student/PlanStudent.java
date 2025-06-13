package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

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
