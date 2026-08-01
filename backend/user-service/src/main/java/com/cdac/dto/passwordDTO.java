package com.cdac.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class passwordDTO {
	
	
	@Positive(message = "User ID must be greater than 0")

	    private Long id;
	    @NotBlank(message = " password is required")
	    @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
	    private String password;
	

}
