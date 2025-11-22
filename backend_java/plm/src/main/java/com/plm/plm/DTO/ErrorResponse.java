package com.plm.plm.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private boolean success = false;
    private ErrorDetail error;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ErrorDetail {
        private String message;
        private String details;
    }

    public static ErrorResponse of(String message) {
        return new ErrorResponse(false, new ErrorDetail(message, null));
    }

    public static ErrorResponse of(String message, String details) {
        return new ErrorResponse(false, new ErrorDetail(message, details));
    }
}

