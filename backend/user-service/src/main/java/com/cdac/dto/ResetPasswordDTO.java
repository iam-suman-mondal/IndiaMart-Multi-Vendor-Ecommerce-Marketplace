package com.cdac.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDTO {
	 @NotBlank(message = "Email is required")
	    @Email(message = "Invalid email format")
	private String email;

	 @NotBlank(message = "OTP is required")
	    @Pattern(regexp = "^[0-9]{6}$", message = "OTP must be a 6-digit number")
		   
    private String otp;

	 @NotBlank(message = "New password is required")
	    @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
    private String newPassword;
}
