package com.multivendor.apigateway.exception;



public class JwtExpiredException extends JwtAuthenticationException {

    public JwtExpiredException(String message) {
        super(message);
    }
}
