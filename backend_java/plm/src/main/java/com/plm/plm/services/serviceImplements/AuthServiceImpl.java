package com.plm.plm.services.serviceImplements;

import com.plm.plm.Config.exception.ConflictException;
import com.plm.plm.Config.exception.ResourceNotFoundException;
import com.plm.plm.Config.exception.UnauthorizedException;
import com.plm.plm.security.JwtTokenProvider;
import com.plm.plm.dto.AuthResponseDTO;
import com.plm.plm.dto.UserDTO;
import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Enums.Rol;
import com.plm.plm.Models.User;
import com.plm.plm.Reposotory.UserRepository;
import com.plm.plm.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public AuthResponseDTO register(UserDTO userDTO) {
        validateUserDTO(userDTO, true);

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new ConflictException("El email ya está registrado");
        }

        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(hashedPassword);
        user.setNombre(userDTO.getNombre());
        user.setRol(userDTO.getRol() != null ? userDTO.getRol() : Rol.USUARIO);
        user.setEstado(EstadoUsuario.ACTIVO);

        user = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(
            user.getId(),
            user.getEmail(),
            user.getRol().getValor()
        );

        UserDTO responseDTO = userToDTO(user);

        return new AuthResponseDTO(responseDTO, token);
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponseDTO login(UserDTO userDTO) {
        validateUserDTO(userDTO, false);

        User user = userRepository.findByEmailAndEstado(
            userDTO.getEmail(),
            EstadoUsuario.ACTIVO
        ).orElseThrow(() -> new UnauthorizedException("Credenciales inválidas"));

        if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        String token = jwtTokenProvider.generateToken(
            user.getId(),
            user.getEmail(),
            user.getRol().getValor()
        );

        UserDTO responseDTO = userToDTO(user);

        return new AuthResponseDTO(responseDTO, token);
    }

    private void validateUserDTO(UserDTO userDTO, boolean requirePassword) {
        if (userDTO.getEmail() == null || userDTO.getEmail().trim().isEmpty()) {
            throw new com.plm.plm.Config.exception.BadRequestException("El email es requerido");
        }

        if (!isValidEmail(userDTO.getEmail())) {
            throw new com.plm.plm.Config.exception.BadRequestException("El email no es válido");
        }

        if (requirePassword) {
            if (userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
                throw new com.plm.plm.Config.exception.BadRequestException("La contraseña es requerida");
            }

            if (userDTO.getPassword().length() < 6) {
                throw new com.plm.plm.Config.exception.BadRequestException("La contraseña debe tener al menos 6 caracteres");
            }
        }

        if (userDTO.getNombre() == null || userDTO.getNombre().trim().isEmpty()) {
            throw new com.plm.plm.Config.exception.BadRequestException("El nombre es requerido");
        }

        if (userDTO.getNombre().trim().length() < 2) {
            throw new com.plm.plm.Config.exception.BadRequestException("El nombre debe tener al menos 2 caracteres");
        }
    }

    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getProfile(Integer userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if (user.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }

        return userToDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getProfile(String email) {
        User user = userRepository.findByEmailAndEstado(email, EstadoUsuario.ACTIVO)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        return userToDTO(user);
    }

    private UserDTO userToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setNombre(user.getNombre());
        dto.setRol(user.getRol());
        dto.setEstado(user.getEstado());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }
}

