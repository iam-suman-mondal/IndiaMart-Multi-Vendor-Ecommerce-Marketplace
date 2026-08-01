package com.multivendor.apigateway.exception;

public class JwtAuthenticationException extends RuntimeException {
     public JwtAuthenticationException(String message) {
    	 super(message);
     }
}
