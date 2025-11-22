package com.plm.plm.Config.GlobalExceptions;

public class UnauthorizedException extends AppException {
    public UnauthorizedException(String message) {
        super(message, 401);
    }
}

