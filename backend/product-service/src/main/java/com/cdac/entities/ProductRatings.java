package com.cdac.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="product_ratings",
		uniqueConstraints = {
				@UniqueConstraint(
						columnNames= {"product_id", "user_id"})
		})
@Getter
@Setter
public class ProductRatings {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="product_rating_id")
private Long productRatingId;

@Column(name="product_id")
private Long productId;

@Column(name="user_id")
private Long userId;

private Integer rating;
}
