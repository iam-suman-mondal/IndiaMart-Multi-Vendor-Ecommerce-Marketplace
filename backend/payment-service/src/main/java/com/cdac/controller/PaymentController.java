package com.cdac.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.Payment;
import com.cdac.service.PaymentService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

	private final PaymentService paymentService;
	
	/*
	 * Process Webhook to verify payment status
	 */
	@PostMapping("/webhook")
    public ResponseEntity<Void> cashfreeWebhook(
            @RequestBody String rawBody,
            @RequestHeader("x-webhook-signature") String signature,
            @RequestHeader("x-webhook-timestamp") String timestamp) {

        paymentService.processWebhook(rawBody, signature, timestamp);

        return ResponseEntity.ok().build();
    }
	
	/*
	 * Recent 10 Payments
	 */
	@GetMapping("/recent")
	public ResponseEntity<List<Payment>> getRecentPayments(){
		return ResponseEntity.ok(paymentService.getRecentPayments());
	}
	
	/*
	 * Get Payment details by cf_payment_id
	 */
	@GetMapping("/{cfPaymentId}")
	public ResponseEntity<Payment> getPaymentDetails(@PathVariable String cfPaymentId) {
		return ResponseEntity.ok(paymentService.gePaymentsDetails(cfPaymentId));
	}
	
	
	
}
