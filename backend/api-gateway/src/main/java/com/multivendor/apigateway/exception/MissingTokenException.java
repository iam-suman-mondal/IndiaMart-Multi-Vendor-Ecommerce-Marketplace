package com.multivendor.apigateway.exception;

public class MissingTokenException extends JwtAuthenticationException {
	public MissingTokenException(String message) {
		super(message);
	}
}
