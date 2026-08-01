package com.cdac.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Payment;


public interface PaymentRepository extends JpaRepository<Payment, UUID> {

	Optional<Payment> findByOrderId(UUID orderId);
	
	List<Payment> findTop10ByOrderByUpdatedAtDesc();
	
	Optional<Payment> findByCfPaymentId(String cfPaymentId);
	
}
