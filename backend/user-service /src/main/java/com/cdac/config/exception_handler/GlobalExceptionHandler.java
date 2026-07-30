package com.cdac.config.exception_handler;

import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cdac.custom_exceptions.AuthenticationFailedException;
import com.cdac.custom_exceptions.ResourceNotFoundException;
import com.cdac.dto.ApiResponse;

/*
 * Declares a spring bean containing
 * - recurring (repeating) cross cutting conncern(=task=responsibility) exc handling logic
 * - @ControllerAdvice + @ResponseBody
 * 
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
	/*
	 * To declare exc handling method (catch clause)
	 */
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		System.out.println("in resource not found exc");
		return ResponseEntity.status(HttpStatus.NOT_FOUND) // SC 404
				.body(new ApiResponse("Failed", e.getMessage()));
	}

//	@ExceptionHandler(AuthenticationException.class)
//	public ResponseEntity<?> handleAuthenticationFailedException(AuthenticationFailedException e) {
//		System.out.println("in auth failed exc");
//		return ResponseEntity.status(HttpStatus.UNAUTHORIZED) // SC 401
//				.body(new ApiResponse("Failed", e.getMessage()));
//	}

	// handle validation failures triggered @Valid
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	public Map<String,String> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		System.out.println("in bad request   exc");
		// 1. Get the list of affected (rejected) field errors
		List<FieldError> fieldErrors = e.getFieldErrors();
		// 2. Convert List<FieldError> -> Map<String - fieldName,String - errMesg)
//		Map<String,String> fieldErrMap=new HashMap<>();
//		fieldErrors.forEach(fieldErr -> fieldErrMap.put(fieldErr.getField(), fieldErr.getDefaultMessage()));
		Map<String, String> fieldErrMap = fieldErrors.stream() // Stream<FieldError>
				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return fieldErrMap;
	}

	// handle all remaining excs - catch all
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
		System.out.println("in catch-all  exc");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // SC 500
				.body(new ApiResponse("Failed", e.getMessage()));
	}

}
