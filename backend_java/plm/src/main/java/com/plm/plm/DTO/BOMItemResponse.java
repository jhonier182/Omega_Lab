package com.plm.plm.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BOMItemResponse {
    private Integer id;
    private Integer bomId;
    private Integer materialId;
    private String materialNombre;
    private String materialCodigo;
    private String materialUnidadMedida;
    private BigDecimal cantidad;
    private String unidad;
    private BigDecimal porcentaje;
    private Integer secuencia;
    private LocalDateTime createdAt;
}

