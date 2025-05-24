package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.util.List;
import java.util.Map;

public record StudioInputDTO(
        String name,
        String address,
        List<String> daysOperation,
        List<String> openingHours,
        Integer limitStudentsPerClass,
        List<String> unavailableTimes,
        Map<String, String> instructorsByTime,
        List<String> holidays,
        List<String> recesses,
        Boolean isActive
) {}