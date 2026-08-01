package com.cdac.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.CustomerDetailsDto;
import com.cdac.service.CustomerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalUserController {
	
 private final CustomerService customerService;
    @GetMapping("/{customerId}")
    public CustomerDetailsDto getCustomerDetails(
            @PathVariable Long customerId) {

        // service call
    	return customerService.getCustomer(customerId);
    }

}
