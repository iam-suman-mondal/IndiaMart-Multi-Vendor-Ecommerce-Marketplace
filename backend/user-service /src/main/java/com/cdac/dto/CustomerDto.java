package com.cdac.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
	
	@NotBlank(message = "Name is required")
    @Size(
        min = 3,
        max = 30,
        message = "Name must be between 3 and 30 characters"
    )
	 private String name;
	
	@NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")

	    private String email;
	
	@NotBlank(message = " password is required")
    @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
	    private String password;
        
	@NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must contain exactly 10 digits"
    )
		    private String phoneNo;
	
	
	 @NotBlank(message = "Address is required")
	    @Size(
	        max = 100,
	        message = "Address cannot exceed 100 characters"
	    )
	    private String address;
	

		@NotBlank(message = "City is required")
	    @Size(
	        max = 50,
	        message = "City cannot exceed 50 characters"
	    )
	    private String city;
		
		@NotBlank(message = "State is required")
	    @Size(
	        max = 50,
	        message = "State cannot exceed 50 characters"
	    )
	    private String state;

		@NotBlank(message = "Pincode is required")
	    @Pattern(
	        regexp = "^[0-9]{6}$",
	        message = "Pincode must contain exactly 6 digits"
	    )
		
	    private String pincode;

}
