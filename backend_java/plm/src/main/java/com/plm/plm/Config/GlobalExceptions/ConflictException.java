package com.plm.plm.Config.GlobalExceptions;

public class ConflictException extends AppException {
    public ConflictException(String message) {
        super(message, 409);
    }
}

