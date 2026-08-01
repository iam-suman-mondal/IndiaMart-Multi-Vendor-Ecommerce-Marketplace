package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDetailsDto {
	
    private String name;
    
    private String email;

    private String phoneNo;

    private String address;

    private String city;

    private String state;

    private String pincode;
}