package com.cdac.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerProfileDTO {
	
	 @NotNull(message = "ID is required")
	@Positive(message = "Id must be positive ")
	private  Long id;
	
	
	 @NotBlank(message = "Name is required")
	 private String name;
	
	 @NotBlank(message = "Phone number is required")
	    @Pattern(
	        regexp = "^[0-9]{10}$",
	        message = "Phone number must contain exactly 10 digits"
	    )
	    private String phoneNo;
}
