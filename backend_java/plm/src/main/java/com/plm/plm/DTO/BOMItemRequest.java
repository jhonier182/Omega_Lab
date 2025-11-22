package com.plm.plm.DTO;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BOMItemRequest {
    
    @NotNull(message = "El ID del material es requerido")
    private Integer materialId;
    
    @NotNull(message = "La cantidad es requerida")
    @DecimalMin(value = "0.0001", message = "La cantidad debe ser mayor a 0")
    private BigDecimal cantidad;
    
    private String unidad;
    
    @DecimalMin(value = "0.0", message = "El porcentaje no puede ser negativo")
    @DecimalMax(value = "100.0", message = "El porcentaje no puede ser mayor a 100")
    private BigDecimal porcentaje;
}

