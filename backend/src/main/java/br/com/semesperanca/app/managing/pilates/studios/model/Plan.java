package br.com.semesperanca.app.managing.pilates.studios.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@RequiredArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Planos")

public class Plan {

    @Id
    private String id;

    @NonNull
    private String name;
    @NonNull
    private String period;
    @NonNull
    private String frequency;
    @NonNull
    private Double monthlyPrice;
    @NonNull
    private Double totalPrice;
    @NonNull
    private String cancellationPolicy;
    @NonNull
    private Boolean isActive;

}