package com.plm.plm.Config;

import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Enums.Rol;
import com.plm.plm.Models.User;
import com.plm.plm.Reposotory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String email = "admin@proscience.com";
        String password = "admin123";
        String nombre = "Administrador";
        Rol rol = Rol.ADMIN;

        if (userRepository.existsByEmail(email)) {
            System.out.println("El usuario administrador ya existe");
            return;
        }

        String hashedPassword = passwordEncoder.encode(password);

        User admin = new User();
        admin.setEmail(email);
        admin.setPassword(hashedPassword);
        admin.setNombre(nombre);
        admin.setRol(rol);
        admin.setEstado(EstadoUsuario.ACTIVO);

        userRepository.save(admin);

        System.out.println("Usuario administrador creado exitosamente");
        System.out.println("Email: " + email);
        System.out.println("Password: " + password);
        System.out.println("IMPORTANTE: Cambia la contraseña después del primer login");
    }
}

