package com.plm.plm.Config.exception;

public class ResourceNotFoundException extends AppException {
    public ResourceNotFoundException(String message) {
        super(message, 404);
    }
}

