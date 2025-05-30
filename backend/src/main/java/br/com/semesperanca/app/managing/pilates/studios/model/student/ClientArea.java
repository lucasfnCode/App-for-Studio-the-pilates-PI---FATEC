package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ClientArea {

    @NonNull
    private LocalDate paymentDueDate;

    private int makeUps;

    @NonNull
    private String paymentReceipt;

    @NonNull
    private String fiscalReceipt;

    @NonNull
    private String contract;

    private List<UpComingClass> upComingClasses = new ArrayList<>();

    @NonNull
    private Boolean imageAuthorization;

}
