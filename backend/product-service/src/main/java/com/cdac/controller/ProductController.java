package com.cdac.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.AddProductDto;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.ImageUploadResponse;
import com.cdac.dto.RatingRequest;
import com.cdac.dto.UpdateRequestDto;
import com.cdac.entities.Category;
import com.cdac.service.AwsS3Service;
import com.cdac.service.CentralLoggerService;
import com.cdac.service.ProductRatingService;
import com.cdac.service.ProductSalesService;
import com.cdac.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Validated
public class ProductController {

	private final ProductService productService;
	private final ProductRatingService productRatingService;
	private final AwsS3Service awsS3Service;
	private final CentralLoggerService centralLogger;
	private final ProductSalesService productSalesService;
	
	@PostMapping()
	public ResponseEntity<?> addProduct(@RequestHeader("X-User-Id") Long vendorId,  @RequestHeader("X-User-Role") String userRole,@RequestBody AddProductDto dto){
		dto.setVendorId(vendorId);
		return ResponseEntity.status(HttpStatus.CREATED).body(productService.addProduct(dto, userRole));
	}
	
	@GetMapping("/{productId}")
	public ResponseEntity<?> getProductById(@PathVariable Long productId){
		return ResponseEntity.ok(productService.getProductById(productId));
	}
	
	@GetMapping
	public ResponseEntity<?> getProductsByCategory(@RequestParam Category category){
		return ResponseEntity.ok(productService.getProductsByCategory(category));
	}
	
	@GetMapping("/myproducts")
	public ResponseEntity<?> getAllProducts(@RequestHeader("X-User-Id") Long vendorId){
		return ResponseEntity.ok(productService.getAllProducts(vendorId));
	}
	
	@PutMapping("/Edit")
	public ResponseEntity<?> UpdateProduct(@RequestHeader("X-User-Id") Long userId, @RequestHeader("X-User-Role") String userRole, @RequestBody UpdateRequestDto dto){
		return ResponseEntity.ok(productService.updateProduct(userId, userRole, dto));
	}
	
	@DeleteMapping("/{productId}")
	public ResponseEntity<?> DeleteProduct(@RequestHeader("X-User-Id") Long userId, @RequestHeader("X-User-Role") String userRole, @PathVariable Long productId){
		productService.deleteProductById(userId,userRole, productId);
		return ResponseEntity.noContent().build();
	}
	
	@PatchMapping("/{productId}/publish-unpublish")
	public ResponseEntity<?> togglePublishStatus(@RequestHeader("X-User-Id") Long vendorId, @PathVariable Long productId){
		productService.togglePublishStatus(vendorId, productId);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/product-count")
	public ResponseEntity<?> getMyProductsCount(@RequestHeader("X-User-Id") Long vendorId){
		return ResponseEntity.ok(productService.getMyProductCount(vendorId));
	}
	
	@GetMapping("/search")
	public ResponseEntity<?> getAllProducts(@RequestParam String productName){
		return ResponseEntity.ok(productService.getByProductName(productName));
	}
	
	
	
	
	//Upload Image
	 @GetMapping("/presigned-url")
	    public ResponseEntity<ImageUploadResponse> getPresignedUploadUrl(
	            @RequestParam String extension,
	            @RequestParam String contentType) {

	        ImageUploadResponse response =
	        		awsS3Service.generatePresignedUploadUrl(
	                        extension,
	                        contentType
	                );

	        return ResponseEntity.ok(response);
	    }
	
	
	
	//ratingControll
	
	@PatchMapping("/{productId}/rating")
	public ResponseEntity<Void> addOrUpdateRating(
	        @PathVariable Long productId,
	        @RequestHeader("X-User-Id") Long userId,
	        @Valid @RequestBody RatingRequest request) {

	    productRatingService.addOrUpdateRating(
	            productId,
	            userId,
	            request.getRating()
	    );

	    return ResponseEntity.ok().build();
	}
	
	//BestSelling 
	@GetMapping("/best-selling")
	public ResponseEntity<?> getBestSellingProducts(){

	    return ResponseEntity.ok(
	            productSalesService.getBestSellingProducts()
	    );
	}
}
