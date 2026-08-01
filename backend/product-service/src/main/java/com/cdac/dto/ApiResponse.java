package com.cdac.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
private String status;
private LocalDateTime timeStamp;
private String message;

public ApiResponse(String status, String message) {
	super();
	this.status = status;
	this.message = message;
	this.timeStamp = LocalDateTime.now();
}

}
