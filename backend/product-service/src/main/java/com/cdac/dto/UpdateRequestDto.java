package com.cdac.dto;

import java.math.BigDecimal;

import com.cdac.entities.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRequestDto {
	private Long productId;
	
	private String name;
	
	private String description;
	
	private BigDecimal price;
	
	private String image;
	
	private Integer quantity;
	
	
	
	private Category category;
}
