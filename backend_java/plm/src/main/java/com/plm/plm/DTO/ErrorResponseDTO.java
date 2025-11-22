package com.plm.plm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseDTO {
    private boolean success = false;
    private ErrorDetail error;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ErrorDetail {
        private String message;
        private String details;
    }

    public static ErrorResponseDTO of(String message) {
        return new ErrorResponseDTO(false, new ErrorDetail(message, null));
    }

    public static ErrorResponseDTO of(String message, String details) {
        return new ErrorResponseDTO(false, new ErrorDetail(message, details));
    }
}

