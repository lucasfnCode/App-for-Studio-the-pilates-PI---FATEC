package br.com.semesperanca.app.managing.pilates.studios.application.model.studentInputDTO;

import java.time.LocalDate;
import java.util.List;

public record ClientAreaInputDTO(
    LocalDate paymentDueDate,
    Integer makeUps,
    String paymentProof,
    String fiscalReceipt,
    String contract,
    List<UpComingClassInputDTO> upComingClasses,
    Boolean imageAuthorization
) {}

