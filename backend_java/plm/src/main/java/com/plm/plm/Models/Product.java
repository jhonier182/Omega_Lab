package com.plm.plm.Models;

import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Enums.TipoProducto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "productos",
    indexes = {
        @Index(name = "idx_codigo", columnList = "codigo"),
        @Index(name = "idx_tipo", columnList = "tipo"),
        @Index(name = "idx_categoria", columnList = "categoria"),
        @Index(name = "idx_estado", columnList = "estado")
    },
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_codigo", columnNames = "codigo")
    }
)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    @NotBlank(message = "El código del producto es requerido")
    private String codigo;

    @Column(nullable = false, length = 255)
    @NotBlank(message = "El nombre del producto es requerido")
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 100)
    private String categoria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @NotNull(message = "El tipo de producto es requerido")
    private TipoProducto tipo = TipoProducto.PRODUCTO_TERMINADO;

    @Column(name = "unidad_medida", nullable = false, length = 50)
    @NotBlank(message = "La unidad de medida es requerida")
    private String unidadMedida = "un";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @NotNull(message = "El estado es requerido")
    private EstadoUsuario estado = EstadoUsuario.ACTIVO;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BOM> boms = new ArrayList<>();

    @OneToMany(mappedBy = "material", fetch = FetchType.LAZY)
    private List<BOMItem> usadoEnBOMs = new ArrayList<>();
}

