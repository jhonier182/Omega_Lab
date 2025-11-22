package com.plm.plm.Config.GlobalExceptions;

public class AppException extends RuntimeException {
    private final int statusCode;
    private final boolean isOperational;

    public AppException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }

    public AppException(String message, int statusCode, boolean isOperational) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public boolean isOperational() {
        return isOperational;
    }
}

