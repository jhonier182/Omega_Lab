package com.plm.plm.DTO;

import com.plm.plm.Enums.EstadoBOM;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BOMResponse {
    private Integer id;
    private Integer productoId;
    private String version;
    private EstadoBOM estado;
    private String justificacion;
    private Integer createdBy;
    private Integer approvedBy;
    private LocalDateTime approvedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<BOMItemResponse> items;
}

