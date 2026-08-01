package com.cdac.dto;

import java.math.BigDecimal;
import java.util.List;

import com.cdac.entity.VendorOrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VendorOrderDetailsDto {

    private Long id;

    private BigDecimal subtotal;

    private BigDecimal commissionAmount;

    private VendorOrderStatus status;

    private CustomerDetailsDto customer;

    private List<OrderItemResponseDto> items;
}