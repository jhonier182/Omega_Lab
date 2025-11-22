package com.plm.plm.Enums;


public enum Rol {
    USUARIO("usuario"),
    ANALISTA("analista"),
    SUPERVISOR("supervisor"),
    QA_MANAGER("qa_manager"),
    ADMIN("admin");

    private final String valor;

    Rol(String valor) {
        this.valor = valor;
    }

    public String getValor() {
        return valor;
    }

    public static Rol fromString(String valor) {
        for (Rol rol : Rol.values()) {
            if (rol.valor.equalsIgnoreCase(valor)) {
                return rol;
            }
        }
        throw new IllegalArgumentException("Rol no válido: " + valor);
    }
}

