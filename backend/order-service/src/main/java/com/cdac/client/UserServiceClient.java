package com.cdac.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cdac.dto.CustomerDetailsDto;

@FeignClient(name = "USER-SERVICE", path = "/internal")
public interface UserServiceClient {
	
	@GetMapping("/{customerId}")
	CustomerDetailsDto getCustomerDetails(@PathVariable Long customerId);
	
}
