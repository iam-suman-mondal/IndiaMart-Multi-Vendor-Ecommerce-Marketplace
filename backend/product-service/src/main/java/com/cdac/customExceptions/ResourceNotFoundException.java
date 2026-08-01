package com.cdac.customExceptions;

public class ResourceNotFoundException extends RuntimeException{
		public ResourceNotFoundException(String errMesg) {
			super(errMesg);
		}

}
