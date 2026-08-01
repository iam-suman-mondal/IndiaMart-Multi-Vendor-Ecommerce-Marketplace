package com.cdac.globalExceptionHandling;

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

import com.cdac.customExceptions.ResourceNotFoundException;
import com.cdac.dto.ApiResponse;
import com.cdac.service.CentralLoggerService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
	
	private final CentralLoggerService centralLogger;
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e, HttpServletRequest request) {
		System.out.println("in resource not found exc");
		centralLogger.error(
				 request.getHeader("X-User-Role"),
				 Long.parseLong(request.getHeader("X-User-Id")),
	             e.getStackTrace()[0].getMethodName()+"|-|"+  e.getMessage()
	    );
		return ResponseEntity.status(HttpStatus.NOT_FOUND) // SC 404
				.body(new ApiResponse("Failed", e.getMessage()));
	}


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
	public ResponseEntity<?> handleRuntimeException(RuntimeException e,  HttpServletRequest request) {
		System.out.println("in catch-all  exc");
		centralLogger.error(
				 request.getHeader("X-User-Role"),
				 Long.parseLong(request.getHeader("X-User-Id")),
	            e.getMessage()
	    );
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // SC 500
				.body(new ApiResponse("Failed", e.getMessage()));
	}

}
