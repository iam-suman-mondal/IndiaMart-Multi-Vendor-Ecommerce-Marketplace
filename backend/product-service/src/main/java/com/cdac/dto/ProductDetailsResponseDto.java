package com.cdac.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ProductDetailsResponseDto {
	
	private Long productId;
	
	private String name;
	
	private BigDecimal price;
	
	private Integer quantity;
	
	private String image;
	
	private Long vendorId;
}
