package com.cdac.contoller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.CreateOrderRequestDto;
import com.cdac.dto.OrderResponseDto;
import com.cdac.dto.VendorOrderDetailsDto;
import com.cdac.dto.WeeklyAnalyticsDto;
import com.cdac.entity.VendorOrder;
import com.cdac.entity.VendorOrderStatus;
import com.cdac.service.OrderService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Validated
public class OrderContoller {

	private final OrderService orderService;
	
	/*
	 *  Place new Order
	 */
	@PostMapping	
	public ResponseEntity<OrderResponseDto> createOrder(
			 	@Valid @RequestBody CreateOrderRequestDto dto,
		        @NotNull(message = "Customer id is required")
		        @Positive(message = "Customer id must be positive")
			 	@RequestHeader("X-User-Id")
		        Long customerId) {
		return new ResponseEntity<>(orderService.createOrder(customerId, dto), HttpStatus.CREATED);
	}
	
	/*
	 * Get all orders for a customer
	 */
	@GetMapping("/customer")
	public ResponseEntity<List<OrderResponseDto>> getAllOrdersForCustomer(
			@RequestHeader("X-User-Id")
	        @NotNull(message = "Customer id is required")
	        @Positive(message = "Customer id must be positive")
	        Long customerId) {
		return ResponseEntity.ok(orderService.getAllOrdersForCustomer(customerId));
	}
	
	/*
	 *  Get order details by order Id
	 */
	@GetMapping("/{orderId}")
	public ResponseEntity<OrderResponseDto> getOrderById(
			 	@PathVariable
		        @NotNull(message = "Order id is required")
		        UUID orderId) {
		return ResponseEntity.ok(orderService.getOrderById(orderId));
	}
	
	/*
	 * Get all orders for a vendor
	 */
	@GetMapping("/vendor")
	public ResponseEntity<List<VendorOrder>> getAllOrdersForVendor(
			@RequestHeader("X-User-Id")
	        @NotNull(message = "Vendor id is required")
	        @Positive(message = "Vendor id must be positive")
	        Long vendorId) {
		return ResponseEntity.ok(orderService.getAllOrdersForVendor(vendorId));
	}
	
	/*
	 * Get vendor-order details by vendor-order-id
	 */
	@GetMapping("/vendor/{vendorOrderId}")
	public ResponseEntity<VendorOrderDetailsDto> getVendorOrderDetailsById(
			@PathVariable
	        @NotNull(message = "Vendor order id is required")
	        @Positive(message = "Vendor order id must be positive")
	        Long vendorOrderId) {

	    return ResponseEntity.ok(orderService.getVendorOrderDetailsById(vendorOrderId));
	}
	
	/*
	 * Update vendor-order status (Only by vendor)
	 */
	@PatchMapping("/vendor/update-status/{vendorOrderId}")
	public ResponseEntity<Void> updateVendorOrderStatus(
			
			 	@RequestHeader("X-User-Id")
		        @NotNull(message = "Vendor id is required")
		        @Positive(message = "Vendor id must be positive")
		        Long vendorId,

		        @PathVariable
		        @NotNull(message = "Vendor order id is required")
		        @Positive(message = "Vendor order id must be positive")
		        Long vendorOrderId,

		        @RequestParam
		        @NotNull(message = "Status is required")
		        VendorOrderStatus status) {

		orderService.updateVendorOrderStatus(vendorId, vendorOrderId, status);
		return ResponseEntity.ok().build();
	}

	/*
	 * Dashboard Analytics for VENDOR
	 */
	@GetMapping("/vendor/analytics")
	public ResponseEntity<WeeklyAnalyticsDto> getVendorDashboardAnalytics(
			@RequestHeader("X-User-Id")
	        @NotNull(message = "Vendor id is required")
	        @Positive(message = "Vendor id must be positive")
	        Long vendorId) {
		return ResponseEntity.ok(orderService.getVendorDashboardAnalytics(vendorId));
	}

	/*
	 * Dashboard Analytics for ADMIN
	 */
	@GetMapping("/admin/analytics")
	public ResponseEntity<WeeklyAnalyticsDto> getAdminDashboardAnalytics() {
		return ResponseEntity.ok(orderService.getAdminDashboardAnalytics());
	}
	
}
