package com.plm.plm.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bom_items",
    indexes = {
        @Index(name = "idx_bom_id", columnList = "bom_id"),
        @Index(name = "idx_material_id", columnList = "material_id"),
        @Index(name = "idx_secuencia", columnList = "secuencia")
    }
)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BOMItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bom_id", nullable = false, foreignKey = @ForeignKey(name = "fk_bom_item_bom"))
    @NotNull(message = "El BOM es requerido")
    private BOM bom;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "material_id", nullable = false, foreignKey = @ForeignKey(name = "fk_bom_item_material"))
    @NotNull(message = "El material es requerido")
    private Product material;

    @Column(nullable = false, precision = 15, scale = 4)
    @NotNull(message = "La cantidad es requerida")
    @DecimalMin(value = "0.0001", message = "La cantidad debe ser mayor a 0")
    private BigDecimal cantidad;

    @Column(nullable = false, length = 50)
    @NotNull(message = "La unidad es requerida")
    private String unidad = "mg";

    @Column(nullable = false, precision = 5, scale = 2)
    @NotNull(message = "El porcentaje es requerido")
    @DecimalMin(value = "0.0", message = "El porcentaje no puede ser negativo")
    @DecimalMax(value = "100.0", message = "El porcentaje no puede ser mayor a 100")
    private BigDecimal porcentaje = BigDecimal.ZERO;

    @Column(nullable = false)
    @NotNull(message = "La secuencia es requerida")
    private Integer secuencia = 0;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}

