package com.cdac.contoller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.OrderStatus;
import com.cdac.service.OrderService;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@Validated
public class InternalOrderContoller {

	private final OrderService orderService;

	/*
	 * Update order status (ONLY By Payment Service)
	 */
	@PutMapping("/update-status/{orderId}")
	public ResponseEntity<Void> updateOrderStatus(
			 	@PathVariable
		        @NotNull(message = "Order id is required")
		        UUID orderId,

		        @RequestParam
		        @NotNull(message = "Status is required")
		        OrderStatus status) {
		orderService.updateOrderStatus(orderId, status);
		return ResponseEntity.ok().build();
	}	
}
