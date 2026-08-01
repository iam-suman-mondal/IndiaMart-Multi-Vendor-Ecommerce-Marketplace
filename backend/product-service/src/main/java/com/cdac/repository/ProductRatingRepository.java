package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entities.ProductRatings;

public interface ProductRatingRepository extends JpaRepository<ProductRatings, Long> {


    Optional<ProductRatings> findByProductIdAndUserId(
            Long productId,
            Long userId
    );
}
