package com.cdac.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
	
	    private String userEmail;

	    private String subject;

	 
	    private String message;
	   
	}

