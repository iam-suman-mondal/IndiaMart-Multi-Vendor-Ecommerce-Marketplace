package com.cdac.client;

import java.util.List;
import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cdac.dto.BatchReserveRequest;
import com.cdac.dto.OrderItemResponseDto;

import jakarta.validation.Valid;

@FeignClient(name = "PRODUCT-SERVICE", path = "/internal")
public interface ProductServiceClient {

	@PostMapping("/reserve")
	public List<OrderItemResponseDto> reserveStock(@Valid @RequestBody BatchReserveRequest request);
	
	@PostMapping("/confirm/{orderId}")
	public Boolean confirmStock(@PathVariable UUID orderId);
	
	@PostMapping("/release/{orderId}")
	public Boolean releaseStock(@PathVariable UUID orderId);
}
