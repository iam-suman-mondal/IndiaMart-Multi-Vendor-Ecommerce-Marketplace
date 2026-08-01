package com.cdac.client;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cdac.enums.OrderStatus;

@FeignClient(name = "ORDER-SERVICE", path = "/internal")
public interface OrderServiceClient {

	@PutMapping("/update-status/{orderId}")
	public void updateOrderStatus(
			 	@PathVariable UUID orderId, 
			 	@RequestParam OrderStatus status);
	
}
