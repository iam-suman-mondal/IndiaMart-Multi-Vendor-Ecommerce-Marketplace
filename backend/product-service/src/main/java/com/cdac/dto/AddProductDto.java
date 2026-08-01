package com.cdac.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cdac.entities.Category;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddProductDto {
	
	private String name;
	
	private String description;
	
	private BigDecimal price;
	
	private String image;
	
	private String brand;
	
	private Integer availableQuantity;
	
	private Category category;
	
	private Long vendorId;
	
}
