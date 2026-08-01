package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

@AllArgsConstructor
public class CustomerResponseDto {
	private Long id;
	 private String name;

	    private String email;


	    private String phoneNo;

	    private String address;

	    private String city;

	    private String state;

	    private String pincode;

}
