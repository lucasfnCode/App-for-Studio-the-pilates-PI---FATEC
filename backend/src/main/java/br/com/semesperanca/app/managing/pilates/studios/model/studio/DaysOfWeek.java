package br.com.semesperanca.app.managing.pilates.studios.model.studio;

import lombok.Getter;

@Getter
public enum DaysOfWeek {

    SEGUNDA_FEIRA(1, "segunda-feira"),
    TERCA_FEIRA(2, "terça-feira"),
    QUARTA_FEIRA(3, "quarta-feira"),
    QUINTA_FEIRA(4, "quinta-feira"),
    SEXTA_FEIRA(5, "sexta-feira"),
    SABADO(6, "sábado"),
    DOMINGO(7, "domingo");

    private final int valor;
    private final String descricao;

    DaysOfWeek(int valor, String descricao) {
        this.valor = valor;
        this.descricao = descricao;
    }

    public static DaysOfWeek fromValor(int valor) {
        for (DaysOfWeek dia : DaysOfWeek.values()) {
            if (dia.getValor() == valor) {
                return dia;
            }
        }
        throw new IllegalArgumentException("Valor inválido para DiaSemana: " + valor);
    }

    public static DaysOfWeek fromDescricao(String descricao) {
        for (DaysOfWeek dia : DaysOfWeek.values()) {
            if (dia.getDescricao().equalsIgnoreCase(descricao)) {
                return dia;
            }
        }
        throw new IllegalArgumentException("Dia inválido: " + descricao);
    }

    public static String toDescricao(DaysOfWeek dia) {
        if (dia != null) {
            return dia.getDescricao();
        }
        throw new IllegalArgumentException("Dia inválido!");
    }


}
