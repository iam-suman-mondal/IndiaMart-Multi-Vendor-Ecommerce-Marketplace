package com.cdac.service;

import java.util.List;
import java.util.UUID;

import com.cdac.dto.BatchReserveRequest;
import com.cdac.dto.ProductDetailsResponseDto;

public interface ProductInventoryService {

	List<ProductDetailsResponseDto> reserveStock(BatchReserveRequest request);
	
    Boolean confirmStock(UUID orderId);
    
    Boolean releaseStock(UUID orderId);
    
    void releaseExpiredReservations();
}
