package br.com.semesperanca.app.managing.pilates.studios.application.model.studentOutputDTO;

import java.time.LocalDate;
import java.util.List;

public record ClientAreaOutputDTO(
    LocalDate paymentDueDate,
    Integer makeUps,
    String paymentProof,
    String fiscalReceipt,
    String contract,
    List<UpComingClassOutputDTO> upComingClasses,
    Boolean imageAuthorization
) {}
