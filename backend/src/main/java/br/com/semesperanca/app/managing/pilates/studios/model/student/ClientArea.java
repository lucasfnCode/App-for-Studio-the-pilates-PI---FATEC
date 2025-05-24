package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Field;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class ClientArea {

    @NonNull
    @Field("data_vencimento_pagamento")
    private LocalDate paymentDueDate;

    @Field("reposicoes")
    private int makeUps;

    @NonNull
    @Field("comprovante_pagamento")
    private String paymentReceipt;

    @NonNull
    @Field("recibo_fiscal")
    private String fiscalReceipt;

    @NonNull
    @Field("contrato")
    private String contract;

    @Field("proximas_aulas")
    private List<UpComingClass> upComingClasses = new ArrayList<>();

    @NonNull
    @Field("autorizacao_imagem")
    private Boolean imageAuthorization;

}
