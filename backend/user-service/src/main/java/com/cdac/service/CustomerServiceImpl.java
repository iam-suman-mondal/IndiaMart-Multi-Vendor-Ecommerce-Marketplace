package com.cdac.service;

import java.util.List;

import java.util.Optional;

import org.jspecify.annotations.Nullable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.custom_exceptions.ResourceNotFoundException;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.CustomerDetailsDto;
import com.cdac.dto.CustomerDto;
import com.cdac.dto.CustomerProfileDTO;
import com.cdac.dto.CustomerResponseDto;
import com.cdac.dto.passwordDTO;
import com.cdac.entities.Customers;
import com.cdac.entities.Role;
import com.cdac.entities.User;
import com.cdac.repository.CustomerRepository;
import com.cdac.repository.UserRepository;


import lombok.RequiredArgsConstructor;
@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
     
//      private final User user;
	private final UserRepository userRepo;
	private final CustomerRepository customerRepo;
     private final PasswordEncoder passwordEncoder;
//     private final CentralLoggerService centralLogger;
	@Override
	
	public ApiResponse CustomerAndUserRegister(CustomerDto request) {
		 User user = new User();
		 
//		 password hashing using bcrypt
		 
		 String encodedPassword =
			        passwordEncoder.encode(request.getPassword());
//      set user field
			user.setPassword(encodedPassword);
	        user.setEmail(request.getEmail());
//	        user.setPassword(request.getPassword());
	        user.setName(request.getName());
	        user.setRole(Role.ROLE_CUSTOMER);

	        // Customer details in User
	        user.setPhoneNo(request.getPhoneNo());
	        user.setAddress(request.getAddress());
	        
	        userRepo.save(user);
	        Customers customer = new Customers(
	                
	                
	                
	                
	                
	                request.getCity(),
	                request.getState(),
	                request.getPincode()
	        );
	        customer.setUser(user);
	        customerRepo.save(customer);
	        
	       
		
		return new ApiResponse("success " ,"created successfully");
	}

	@Override
	public CustomerResponseDto getCustomerDetails(Long id) {
		// TODO Auto-generated method stub
	User entity=userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid customer ID"));
	Customers custmr=customerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid customer ID"));
	CustomerResponseDto responseDto = new CustomerResponseDto(entity.getId(),entity.getName(),entity.getEmail(),entity.getPhoneNo(),entity.getAddress(),
			custmr.getCity(),custmr.getState(),custmr.getPincode());
	return responseDto;
	
	
	
		
	}

	@Override
	public  List<CustomerResponseDto> getAllCustomerDetails() {
		// TODO Auto-generated method stub
		return customerRepo.getAllCustomers();
	}

	@Override
	public ApiResponse updateProfile(  CustomerProfileDTO request) {
		// TODO Auto-generated method stub
	      User customer = userRepo.findById(request.getId())
	            .orElseThrow(() ->
	                new ResourceNotFoundException("Customer not found"));

	    customer.setName(request.getName());
	    customer.setPhoneNo(request.getPhoneNo());
	    

	    userRepo.save(customer);
		
		return new ApiResponse("success","updated");
	}

	@Override
	public ApiResponse updatePassword(passwordDTO request) {
		// TODO Auto-generated method stub
		User customer = userRepo.findById(request.getId())
	            .orElseThrow(() ->
	                new ResourceNotFoundException("Customer not found"));
	String encodedPassword= passwordEncoder.encode(request.getPassword());
		customer.setPassword(encodedPassword);
//		User user=  customer.getUser();
//		user.setPassword(request.getPassword());
		
		return new ApiResponse("success", "changed password");
	}

	@Override
	public void deleteCustomerProfile(Long userId, String email) {
		// TODO Auto-generated method stub

	    // 1. Find User
	    User user = userRepo.findById(userId)
	            .orElseThrow(() ->
	                    new RuntimeException("User not found"));

	    // 2. Verify email
	    if (!user.getEmail().equals(email)) {
	        throw new RuntimeException(
	                "User email does not match"
	        );
	    }

	 

	    

	   

	    // 3. Check User Role

	    // 1. Find User
	   

	  

	    // 3. Check User Role
	    if (user.getRole() != Role.ROLE_CUSTOMER && user.getRole() != Role.ROLE_ADMIN) {
	        throw new RuntimeException(
	                "Only customers and Admin can delete customer profile"
	        );
	    }

	    // 4. Find Customer
	    Customers customer = customerRepo.findById(userId)
	            .orElseThrow(() ->
	                    new RuntimeException(
	                            "Customer profile not found"
	                    ));

	    // 5. Delete Customer
	    customerRepo.delete(customer);

	    // 6. Delete User
//	    userRepo.delete(user);


	   
	}

	@Override
	public CustomerDetailsDto getCustomer(Long customerId) {
		// TODO Auto-generated method stub
		User entity=userRepo.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Invalid customer ID"));
		Customers custmr=customerRepo.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Invalid customer ID"));
		CustomerDetailsDto responseDto = new CustomerDetailsDto(entity.getName(),entity.getEmail(),entity.getPhoneNo(),entity.getAddress(),
				custmr.getCity(),custmr.getState(),custmr.getPincode());
		return responseDto;
		
	
	}

	@Override
	public Long getCustomerCount() {
		return customerRepo.count();
	}
	
}


