package com.cdac.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cdac.dto.PaymentRequestDto;

@FeignClient(name = "PAYMENT-SERVICE", path = "/internal")
public interface PaymentServiceClient {
	
	@PostMapping
	public String createPayment(@RequestBody PaymentRequestDto dto);
	
}