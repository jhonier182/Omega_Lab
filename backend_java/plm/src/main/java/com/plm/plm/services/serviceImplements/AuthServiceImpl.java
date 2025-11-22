package com.plm.plm.services.serviceImplements;

import com.plm.plm.Config.GlobalExceptions.ConflictException;
import com.plm.plm.Config.GlobalExceptions.ResourceNotFoundException;
import com.plm.plm.Config.GlobalExceptions.UnauthorizedException;
import com.plm.plm.Config.JwtTokenProvider;
import com.plm.plm.DTO.AuthResponse;
import com.plm.plm.DTO.LoginRequest;
import com.plm.plm.DTO.RegisterRequest;
import com.plm.plm.DTO.UserDTO;
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
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("El email ya está registrado");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(hashedPassword);
        user.setNombre(request.getNombre());
        user.setRol(request.getRol() != null ? request.getRol() : Rol.USUARIO);
        user.setEstado(EstadoUsuario.ACTIVO);

        user = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(
            user.getId(),
            user.getEmail(),
            user.getRol().getValor()
        );

        UserDTO userDTO = userToDTO(user);

        return new AuthResponse(userDTO, token);
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmailAndEstado(
            request.getEmail(),
            EstadoUsuario.ACTIVO
        ).orElseThrow(() -> new UnauthorizedException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        String token = jwtTokenProvider.generateToken(
            user.getId(),
            user.getEmail(),
            user.getRol().getValor()
        );

        UserDTO userDTO = userToDTO(user);

        return new AuthResponse(userDTO, token);
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

