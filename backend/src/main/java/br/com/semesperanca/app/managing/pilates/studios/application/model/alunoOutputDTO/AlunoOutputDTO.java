package br.com.semesperanca.app.managing.pilates.studios.application.model.alunoOutputDTO;

import java.time.LocalDate;
public record AlunoOutputDTO (
    String id,
    String nome,
    String tipo,
    LocalDate dataNascimento,
    String email,
    String contato,
    String foto,
    AvaliacaoOutputDTO avaliacao,
    String evolucao,
    PlanoOutputDTO plano,
    AreaClienteOutputDTO areaCliente,
    Boolean isActive
) 
    
{}



