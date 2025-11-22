package com.plm.plm.Config.GlobalExceptions;

public class BadRequestException extends AppException {
    public BadRequestException(String message) {
        super(message, 400);
    }
}

