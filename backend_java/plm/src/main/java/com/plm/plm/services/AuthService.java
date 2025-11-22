package com.plm.plm.services;

import com.plm.plm.dto.AuthResponseDTO;
import com.plm.plm.dto.UserDTO;

public interface AuthService {
    AuthResponseDTO register(UserDTO userDTO);
    AuthResponseDTO login(UserDTO userDTO);
    UserDTO getProfile(Integer userId);
    UserDTO getProfile(String email);
}

