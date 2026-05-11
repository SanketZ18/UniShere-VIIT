package com.unishare.exception;

import com.unishare.dto.ApiResponse;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Map<String, Object>>> handleNotFound(ResourceNotFoundException exception) {
        return build(HttpStatus.NOT_FOUND, exception.getMessage(), null);
    }

    @ExceptionHandler({BadRequestException.class, MethodArgumentNotValidException.class, IllegalArgumentException.class})
    public ResponseEntity<ApiResponse<Map<String, Object>>> handleBadRequest(Exception exception) {
        if (exception instanceof MethodArgumentNotValidException validationException) {
            Map<String, Object> details = new HashMap<>();
            validationException.getBindingResult().getAllErrors().forEach(error -> {
                if (error instanceof FieldError fieldError) {
                    details.put(fieldError.getField(), error.getDefaultMessage());
                } else {
                    details.put(error.getObjectName(), error.getDefaultMessage());
                }
            });
            return build(HttpStatus.BAD_REQUEST, "Validation failed", details);
        }
        return build(HttpStatus.BAD_REQUEST, exception.getMessage(), null);
    }

    @ExceptionHandler({UnauthorizedOperationException.class, BadCredentialsException.class})
    public ResponseEntity<ApiResponse<Map<String, Object>>> handleUnauthorized(Exception exception) {
        return build(HttpStatus.UNAUTHORIZED, exception.getMessage(), null);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Map<String, Object>>> handleGeneric(Exception exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(false, exception.getMessage(), null, Instant.now()));
    }

    private ResponseEntity<ApiResponse<Map<String, Object>>> build(
            HttpStatus status,
            String message,
            Map<String, Object> data
    ) {
        return ResponseEntity.status(status).body(new ApiResponse<>(false, message, data, Instant.now()));
    }
}
