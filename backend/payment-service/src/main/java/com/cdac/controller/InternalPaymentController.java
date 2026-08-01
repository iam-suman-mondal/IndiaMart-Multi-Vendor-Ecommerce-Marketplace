package com.cdac.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.PaymentRequestDto;
import com.cdac.service.PaymentService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalPaymentController {

	private final PaymentService paymentService;
	
	/*
	 * Create Cashfree Order (ONLY by order-service)
	 */
	@PostMapping
	public ResponseEntity<String> createPayment(@RequestBody PaymentRequestDto dto) {
		return ResponseEntity.ok(paymentService.createPayment(dto));
	}
		
}
