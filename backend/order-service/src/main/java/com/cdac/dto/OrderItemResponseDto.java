package com.cdac.dto;

import java.math.BigDecimal;

import com.cdac.entity.OrderItemStatus;

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
public class OrderItemResponseDto {

    private Long productId;
    
    private Long vendorId;

    private String name;

    private String image;

    private BigDecimal price;

    private Integer quantity;
    
    private OrderItemStatus status;
}