package com.plm.plm.services;

import com.plm.plm.DTO.AuthResponse;
import com.plm.plm.DTO.LoginRequest;
import com.plm.plm.DTO.RegisterRequest;
import com.plm.plm.DTO.UserDTO;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    UserDTO getProfile(Integer userId);
    UserDTO getProfile(String email);
}

