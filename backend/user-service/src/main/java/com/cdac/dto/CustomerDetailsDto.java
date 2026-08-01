package com.cdac.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomerDetailsDto {
	
    private String name;
    
    private String email;

    private String phoneNo;

    private String address;

   

	private String city;

    private String state;

    private String pincode;
    
    public CustomerDetailsDto(String name, String email, String phoneNo, String address, String city, String state,
			String pincode) {
		super();
		this.name = name;
		this.email = email;
		this.phoneNo = phoneNo;
		this.address = address;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
	}
}
