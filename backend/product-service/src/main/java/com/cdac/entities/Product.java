package com.cdac.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="product")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="product_id")
	private Long productId;
	
	private String name;
	@Column(length= 500)
	private String description;
	
	private BigDecimal price;
	
	private String image;
	
	private String brand;
	
	@Enumerated(EnumType.STRING)
	private Category category;
	
	@Column(name="is_published")
	private Boolean isPublished=false;
	
	@Column(name="vendor_id")
	private Long vendorId;
	
	@CreationTimestamp
	@Column(name="created_on")
	private LocalDateTime createdOn;
	
	@UpdateTimestamp
	@Column(name="updated_on")
	private LocalDateTime updatedOn;
	
	@Column(name = "average_rating", nullable = false)
	private Double averageRating = 0.0;

	@Column(name = "total_rating", nullable = false)
	private Integer totalRatings = 0;
	
	@Column(name = "rating_sum", nullable = false)
	private Integer ratingSum = 0;
	
	@Column(name = "available_quantity", nullable = false)
    private Integer availableQuantity;

    @Column(name= "reserved_quantity", nullable = false)
    private Integer reservedQuantity=0;

    @Version
    private Long version;
	
}
