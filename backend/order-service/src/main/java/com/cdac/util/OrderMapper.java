package com.cdac.util;

import java.math.BigDecimal;
import java.util.List;

import com.cdac.dto.OrderResponseDto;
import com.cdac.dto.OrderItemResponseDto;
import com.cdac.entity.Order;

public class OrderMapper {
	
	public static OrderResponseDto mapToDto(Order order) {
		List<OrderItemResponseDto> items = order.getVendorOrders()
	            .stream()
	            .flatMap(vendorOrder ->
	                    vendorOrder.getItems()
	                            .stream()
	                            .map(item -> OrderItemResponseDto.builder()
	                                    .productId(item.getProductId())
	                                    .vendorId(vendorOrder.getVendorId())
	                                    .name(item.getProductName())
	                                    .image(item.getProductImage())
	                                    .price(item.getPrice())
	                                    .quantity(item.getQuantity())
	                                    .build()))
	            .toList();

	    BigDecimal handlingFee = BigDecimal.valueOf(5);
	    BigDecimal deliveryCharge =
	            order.getTotalAmount().compareTo(new BigDecimal("499")) >= 0
	                    ? BigDecimal.ZERO
	                    : new BigDecimal("50");

	    BigDecimal subTotal = order.getTotalAmount()
	            .subtract(handlingFee)
	            .subtract(deliveryCharge);

	    return OrderResponseDto.builder()
	            .orderId(order.getId())
	            .subtotal(subTotal)
	            .deliveryCharge(deliveryCharge)
	            .handlingFee(handlingFee)
	            .grandTotal(order.getTotalAmount())
	            .status(order.getStatus())
	            .paymentSessionId(order.getPaymentSessionId())
	            .items(items)
	            .address(order.getAddress())
	            .city(order.getCity())
	            .state(order.getState())
	            .pincode(order.getPincode())
	            .build();
	}
	
}
