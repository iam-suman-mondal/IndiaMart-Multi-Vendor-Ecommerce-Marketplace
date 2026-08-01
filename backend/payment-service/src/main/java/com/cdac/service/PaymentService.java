package com.cdac.service;

import java.util.List;

import com.cdac.dto.PaymentRequestDto;
import com.cdac.entity.Payment;

public interface PaymentService {

	String createPayment(PaymentRequestDto dto);

	void processWebhook(String rawBody, String signature, String timestamp);

	List<Payment> getRecentPayments();

	Payment gePaymentsDetails(String cfPaymentId);

}
