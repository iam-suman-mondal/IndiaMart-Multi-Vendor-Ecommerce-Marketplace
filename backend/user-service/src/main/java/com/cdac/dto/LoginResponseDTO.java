package com.cdac.dto;

import com.cdac.entities.Role;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
//@AllArgsConstructor
public class LoginResponseDTO {
	@Positive(message = "User ID must be greater than 0")

	 private Long id;
	    
	    private String email;
	    private String name;
	    private Role role;
	    private String accessToken;
	    private String refreshToken;
		public LoginResponseDTO(Long id, String email, String name, Role role) {
			super();
			this.id = id;
			this.email = email;
			this.name = name;
			this.role = role;
		}
}
