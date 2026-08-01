package com.cdac.service;

import java.util.List;

import org.jspecify.annotations.Nullable;

import com.cdac.dto.ApiResponse;
import com.cdac.dto.CustomerDetailsDto;
import com.cdac.dto.CustomerDto;
import com.cdac.dto.CustomerProfileDTO;
import com.cdac.dto.CustomerResponseDto;
import com.cdac.dto.passwordDTO;
import com.cdac.entities.Customers;

public interface CustomerService {
   ApiResponse CustomerAndUserRegister(CustomerDto request);

//   @Nullable
   CustomerResponseDto getCustomerDetails(Long id);

//   @Nullable
    List<CustomerResponseDto> getAllCustomerDetails();

    ApiResponse updateProfile(CustomerProfileDTO request);

	ApiResponse updatePassword(passwordDTO request);

	void deleteCustomerProfile(Long userId, String email);

	CustomerDetailsDto getCustomer(Long customerId);

	
}
