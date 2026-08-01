package com.cdac.controller;


import org.springframework.http.HttpStatus;

//import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.CustomerDto;
import com.cdac.dto.LoginRequest;
import com.cdac.dto.VerifyOtpRequest;
import com.cdac.entities.Customers;
import com.cdac.entities.User;
import com.cdac.service.AuthService;
import com.cdac.service.CustomerService;
import com.cdac.service.OtpService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
@RestController
//@RestControllerEndpoint
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {
	private final OtpService otpService;
	private  final AuthService authService;

    private final CustomerService customerService;
    
    
//    private  final User user;


  
    // CUSTOMER SIGNUP
    
     

    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteCustomerProfile(
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Email") String email) {

        customerService.deleteCustomerProfile(userId, email);

        return ResponseEntity.ok(
                "Customer profile deleted successfully"
        );
    }
    
    //ToDo
    //1. Update Customer Profile Implementation
  //2. Delete Customer Profile Implementation
}
