package br.com.semesperanca.app.managing.pilates.studios.model.student;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
