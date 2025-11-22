package com.plm.plm.Config.exception;

import com.plm.plm.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponseDTO> handleAppException(AppException ex) {
        ErrorResponseDTO errorResponse = ErrorResponseDTO.of(ex.getMessage());
        return ResponseEntity.status(ex.getStatusCode()).body(errorResponse);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponseDTO> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        String message = "Error al procesar la solicitud. Verifique el formato de los datos enviados.";
        String details = ex.getMessage();
        if (details != null && details.contains("JSON")) {
            message = "Error en el formato JSON. Verifique que todos los campos estén correctamente formateados.";
        }
        ErrorResponseDTO errorResponse = ErrorResponseDTO.of(message, details);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        String message = "Error de validación: " + String.join(", ", errors.values());
        ErrorResponseDTO errorResponse = ErrorResponseDTO.of(message, errors.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGenericException(Exception ex) {
        String message = "Error interno del servidor";
        String details = ex.getMessage();
        
        ErrorResponseDTO errorResponse = ErrorResponseDTO.of(message, details);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}

