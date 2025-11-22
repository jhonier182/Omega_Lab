package com.plm.plm.DTO;

import com.plm.plm.Enums.TipoProducto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    
    @NotBlank(message = "El código del producto es requerido")
    private String codigo;
    
    @NotBlank(message = "El nombre del producto es requerido")
    @Size(min = 2, message = "El nombre debe tener al menos 2 caracteres")
    private String nombre;
    
    private String descripcion;
    
    private String categoria;
    
    private TipoProducto tipo;
    
    private String unidadMedida;
}

