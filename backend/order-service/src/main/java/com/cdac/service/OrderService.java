package com.cdac.service;

import java.util.List;
import java.util.UUID;

import com.cdac.dto.CreateOrderRequestDto;
import com.cdac.dto.OrderResponseDto;
import com.cdac.dto.VendorOrderDetailsDto;
import com.cdac.dto.WeeklyAnalyticsDto;
import com.cdac.entity.OrderStatus;
import com.cdac.entity.VendorOrder;
import com.cdac.entity.VendorOrderStatus;

public interface OrderService {

	OrderResponseDto createOrder(Long customerId, CreateOrderRequestDto dto);

	List<OrderResponseDto> getAllOrdersForCustomer(Long customerId);

	OrderResponseDto getOrderById(UUID orderId);

	List<VendorOrder> getAllOrdersForVendor(Long vendorId);

	VendorOrderDetailsDto getVendorOrderDetailsById(Long vendorOrderId);
	
	void updateVendorOrderStatus(Long vendorId, Long vendorOrderId, VendorOrderStatus newStatus);

	void updateOrderStatus(UUID orderId, OrderStatus newStatus);

	WeeklyAnalyticsDto getVendorDashboardAnalytics(Long vendorId);

	WeeklyAnalyticsDto getAdminDashboardAnalytics();
	
}
