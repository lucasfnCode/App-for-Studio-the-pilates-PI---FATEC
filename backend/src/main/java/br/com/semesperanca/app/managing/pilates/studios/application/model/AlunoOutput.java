package br.com.semesperanca.app.managing.pilates.studios.application.model;

import java.time.LocalDate;
public record AlunoOutput (
    String id,
    String nome,
    String tipo,
    LocalDate data_nascimento,
    String email,
    String contato,
    String foto,
    AvaliacaoOutput avaliacao,
    String evolucao,
    ReavaliacaoOutput reavaliacao,
    AreaClienteOutput areaCliente,
    PlanoOutput plano,
    String meu_plano,
    String comprovante_pagamento,
    String recibo_fiscal,
    String contrato,
    Boolean autorizacao_imagem
) 
    
{}



