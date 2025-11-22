package com.plm.plm.Controllers;

import com.plm.plm.dto.ApiResponseDTO;
import com.plm.plm.dto.AuthResponseDTO;
import com.plm.plm.dto.UserDTO;
import com.plm.plm.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDTO<AuthResponseDTO>> register(@RequestBody UserDTO userDTO) {
        AuthResponseDTO response = authService.register(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponseDTO.success(response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO<AuthResponseDTO>> login(@RequestBody UserDTO userDTO) {
        AuthResponseDTO response = authService.login(userDTO);
        return ResponseEntity.ok(ApiResponseDTO.success(response));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponseDTO<Map<String, UserDTO>>> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        UserDTO user = authService.getProfile(email);
        Map<String, UserDTO> data = new HashMap<>();
        data.put("user", user);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }
}

