package com.plm.plm.Models;

import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Enums.Rol;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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
@Table(name = "usuarios", 
    indexes = {
        @Index(name = "idx_email", columnList = "email"),
        @Index(name = "idx_estado", columnList = "estado")
    }
)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 255)
    @NotBlank(message = "El email es requerido")
    @Email(message = "El email no es válido")
    private String email;

    @Column(nullable = false, length = 255)
    @NotBlank(message = "La contraseña es requerida")
    private String password;

    @Column(nullable = false, length = 255)
    @NotBlank(message = "El nombre es requerido")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @NotNull(message = "El rol es requerido")
    private Rol rol = Rol.USUARIO;

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

    @OneToMany(mappedBy = "creador", fetch = FetchType.LAZY)
    private List<BOM> bomsCreados = new ArrayList<>();

    @OneToMany(mappedBy = "aprobador", fetch = FetchType.LAZY)
    private List<BOM> bomsAprobados = new ArrayList<>();
}

