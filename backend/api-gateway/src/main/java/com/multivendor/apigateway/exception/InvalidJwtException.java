package com.multivendor.apigateway.exception;



public class InvalidJwtException extends JwtAuthenticationException {

    public InvalidJwtException(String message) {
        super(message);
    }
}
