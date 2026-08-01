package com.multivendor.apigateway.exception;

public class AccessDeniedException extends JwtAuthenticationException {

    public AccessDeniedException(String message) {
        super(message);
    }
}