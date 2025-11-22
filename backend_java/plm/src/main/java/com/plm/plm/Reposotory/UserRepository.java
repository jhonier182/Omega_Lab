package com.plm.plm.Reposotory;

import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    Optional<User> findByEmailAndEstado(String email, EstadoUsuario estado);
}

