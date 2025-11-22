package com.plm.plm.Models;

import com.plm.plm.Enums.EstadoUsuario;
import jakarta.persistence.*;
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
@Table(name = "materiales",
    indexes = {
        @Index(name = "idx_codigo", columnList = "codigo"),
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
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String codigo;

    @Column(nullable = false, length = 255)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", foreignKey = @ForeignKey(name = "fk_material_categoria"))
    private Category categoriaEntity;

    @Column(length = 100)
    private String categoria;

    @Column(name = "unidad_medida", nullable = false, length = 50)
    private String unidadMedida = "kg";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoUsuario estado = EstadoUsuario.ACTIVO;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "material", fetch = FetchType.LAZY)
    private List<BOMItem> usadoEnBOMs = new ArrayList<>();

    public String getCategoriaNombre() {
        return categoriaEntity != null ? categoriaEntity.getNombre() : categoria;
    }
}

