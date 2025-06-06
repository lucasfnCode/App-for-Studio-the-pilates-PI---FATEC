package br.com.semesperanca.app.managing.pilates.studios.application.model.plan;

public record PlanOutputDTO(

        String id,
        String name,
        String period,
        String frequency,
        Double monthlyPrice,
        Double totalPrice,
        String cancellationPolicy,
        Boolean isActive

) {
}
