package com.cdac.service;

public interface ProductRatingService {
	

	    void addOrUpdateRating(
	            Long productId,
	            Long userId,
	            Integer newRating
	    );
	}

