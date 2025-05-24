package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Plan {

    @NonNull
    @Field("modalidade")
    private String modality;

    @NonNull
    @Field("frequencia")
    private String frequency;

    @NonNull
    @Field("duracao")
    private String duration;

    @NonNull
    @Field("data_inicio")
    private LocalDate startDate;

    @NonNull
    @Field("forma_pagamento")
    private String paymentMethod;

    @NonNull
    @Field("desconto")
    private String discount;

    @NonNull
    @Field("tipo_pagamento")
    private String paymentType;

    @NonNull
    @Field("data_primeiro_pagamento")
    private LocalDate firstPaymentDate;

    @NonNull
    @Field("data_vencimento")
    private LocalDate dueDate;

}
