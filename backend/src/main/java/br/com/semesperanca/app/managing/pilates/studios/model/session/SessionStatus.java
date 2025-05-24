package br.com.semesperanca.app.managing.pilates.studios.model.session;

import lombok.Getter;

@Getter
public enum SessionStatus {

    ABERTA(1,"aberta"),
    AGENDADA(2,"agendada"),
    FECHADA(3, "fechada");

    private final int valor;
    private final String descricao;

    SessionStatus(int valor, String descricao) {
        this.valor = valor;
        this.descricao = descricao;
    }

    public static SessionStatus fromValor(int valor) {
        for(SessionStatus status : SessionStatus.values()) {
            if(status.getValor() == valor) {
                return status;
            }
        }
        throw new IllegalArgumentException("Valor inválido para status: " + valor);
    }

    public static SessionStatus fromDescricao(String descricao){
        for (SessionStatus status : SessionStatus.values()){
            if(status.getDescricao().equalsIgnoreCase(descricao)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Dia inválido: " + descricao);
    }

    public static String toDescricao(SessionStatus status) {
        if (status != null) {
            return status.getDescricao();
        }
        throw new IllegalArgumentException("Status inválido!");
    }

}
