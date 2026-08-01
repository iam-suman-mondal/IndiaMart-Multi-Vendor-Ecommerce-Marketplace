package com.cdac.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.entities.Product;
import com.cdac.entities.ProductRatings;
import com.cdac.repository.ProductRatingRepository;
import com.cdac.repository.ProductRepository;

import lombok.RequiredArgsConstructor;



@Service
@Transactional(readOnly=true)
@RequiredArgsConstructor
public class ProductRatingServiceImpl implements ProductRatingService {
	
	private final ProductRepository productRepository;
    private final ProductRatingRepository productRatingRepository;

    @Override
    @Transactional
    public void addOrUpdateRating(
            Long productId,
            Long userId,
            Integer newRating) {

        Product product = productRepository
                .findByProductId(productId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found"
                        ));

        Optional<ProductRatings> existingRating =
                productRatingRepository
                        .findByProductIdAndUserId(
                                productId,
                                userId
                        );

        if (existingRating.isPresent()) {

            ProductRatings productRating =
                    existingRating.get();

            Integer oldRating =
                    productRating.getRating();

            Integer newRatingSum =
                    product.getRatingSum()
                            - oldRating
                            + newRating;

            productRating.setRating(newRating);

            product.setRatingSum(newRatingSum);

            product.setAverageRating(
                    calculateAverage(
                            newRatingSum,
                            product.getTotalRatings()
                    )
            );

            productRatingRepository.save(productRating);

            productRepository.save(product);

        } else {

            ProductRatings productRating =
                    new ProductRatings();

            productRating.setProductId(productId);
            productRating.setUserId(userId);
            productRating.setRating(newRating);

            productRatingRepository.save(productRating);

            Integer newRatingSum =
                    product.getRatingSum() + newRating;

            Integer newTotalRatings =
                    product.getTotalRatings() + 1;

            product.setRatingSum(newRatingSum);

            product.setTotalRatings(newTotalRatings);

            product.setAverageRating(
                    calculateAverage(
                            newRatingSum,
                            newTotalRatings
                    )
            );

            productRepository.save(product);
        }
    }
    
    private Double calculateAverage(
            Integer ratingSum,
            Integer totalRatings) {

        if (totalRatings == 0) {
            return 0.0;
        }

        return Math.round(
                ((double) ratingSum / totalRatings) * 100
        ) / 100.0;
    }

}
