package com.cdac.custom_exceptions;

public class AuthenticationFailedException extends RuntimeException {
	public AuthenticationFailedException(String mesg) {
		super(mesg);
	}
}
