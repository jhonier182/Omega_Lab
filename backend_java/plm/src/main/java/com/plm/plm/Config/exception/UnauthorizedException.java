package com.plm.plm.Config.exception;

public class UnauthorizedException extends AppException {
    public UnauthorizedException(String message) {
        super(message, 401);
    }
}

