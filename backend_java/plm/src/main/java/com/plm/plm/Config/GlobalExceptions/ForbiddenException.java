package com.plm.plm.Config.GlobalExceptions;

public class ForbiddenException extends AppException {
    public ForbiddenException(String message) {
        super(message, 403);
    }
}

