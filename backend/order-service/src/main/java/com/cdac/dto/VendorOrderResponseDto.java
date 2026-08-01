package com.cdac.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.cdac.entity.VendorOrderStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorOrderResponseDto {

    private Long id;

    private Long vendorId;

    private BigDecimal subtotal;

    private BigDecimal commissionAmount;

    private VendorOrderStatus status;

    private List<OrderItemResponseDto> items;

    private LocalDateTime deliveredAt;
}