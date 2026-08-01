package com.cdac.dto;

import java.math.BigDecimal;

import com.cdac.entities.Category;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto {

	private String name;
	
	private String description;
	
	private BigDecimal price;
	
	private String image;
	
	private String brand;
	
	private Integer quantity;
	
	private Category category;
	
	private Double averageRating;
	
    private Integer totalRatings;
}
