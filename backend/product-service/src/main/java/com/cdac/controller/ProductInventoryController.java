package com.cdac.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.BatchReserveRequest;
import com.cdac.dto.UpdateSalesDto;
import com.cdac.service.ProductInventoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@Validated
public class ProductInventoryController {
	private final ProductInventoryService inventoryService;
	@PostMapping("/reserve")
	public ResponseEntity<?> reserveStock(@Valid @RequestBody BatchReserveRequest request){
		return ResponseEntity.ok(inventoryService.reserveStock(request));

	}
	
	@PostMapping("/confirm/{orderId}")
	public ResponseEntity<?> confirmStock(@PathVariable UUID orderId){
		return ResponseEntity.ok(inventoryService.confirmStock(orderId));
	}
	
	
	@PostMapping("/release/{orderId}")
	public ResponseEntity<?> releaseStock(@PathVariable UUID orderId){
		return ResponseEntity.ok(inventoryService.releaseStock(orderId));
	}
	
	
}
