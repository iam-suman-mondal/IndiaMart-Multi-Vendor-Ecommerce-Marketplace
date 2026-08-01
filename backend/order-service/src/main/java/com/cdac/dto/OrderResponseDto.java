package com.cdac.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.cdac.entity.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private UUID orderId;

    private BigDecimal subtotal;
    
    private BigDecimal deliveryCharge;
    
    private BigDecimal handlingFee;
    
    private BigDecimal grandTotal;

    private OrderStatus status;

    private String paymentSessionId;

    private List<OrderItemResponseDto> items;
    
    private String address;

    private String city;

    private String state;

    private String pincode;
}