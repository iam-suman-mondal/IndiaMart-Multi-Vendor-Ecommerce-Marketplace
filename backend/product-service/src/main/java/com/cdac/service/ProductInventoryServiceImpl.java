package com.cdac.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.bouncycastle.pqc.crypto.xmss.XMSSReducedSignature;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dto.BatchReserveRequest;
import com.cdac.dto.OrderItemDto;
import com.cdac.dto.ProductDetailsResponseDto;
import com.cdac.entities.Product;
import com.cdac.entities.ReservationStatus;
import com.cdac.entities.StockReservation;
import com.cdac.repository.ProductRepository;
import com.cdac.repository.StockReservationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ProductInventoryServiceImpl implements ProductInventoryService {

	private final ProductRepository productRepository;
	private final StockReservationRepository reservationRepository;
	private final ProductSalesService productSaleService;
	@Override
	@Transactional
	public List<ProductDetailsResponseDto> reserveStock(BatchReserveRequest request) {
		int ttl=(request.getTtlMinutes() != null && request.getTtlMinutes()>0) ? request.getTtlMinutes() : 15;
		LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(ttl);
		
		List<ProductDetailsResponseDto> reservedItemDetailsList = new ArrayList<>();
		
		for(OrderItemDto item : request.getItems()) {
			Product product=productRepository.findById(item.getProductId())
					.orElseThrow(()-> new RuntimeException("Product not found"));
			
			if(product.getAvailableQuantity() < item.getQuantity()) {
				throw new RuntimeException("Insufficiend Stock for Product :" +product.getName());
			}
			
			product.setAvailableQuantity(product.getAvailableQuantity()-item.getQuantity());
			product.setReservedQuantity(product.getReservedQuantity()+item.getQuantity());
		
			
			StockReservation reservation= StockReservation.builder()
					.orderId(request.getOrderId())
					.productId(product.getProductId())
					.vendorId(product.getVendorId())
					.quantity(item.getQuantity())
					.status(ReservationStatus.PENDING)
					.expiresAt(expirationTime)
					.build();
			
			productRepository.save(product);
			reservationRepository.save(reservation);
			
			
			ProductDetailsResponseDto itemDetails = ProductDetailsResponseDto.builder()
	                .productId(product.getProductId())
	                .name(product.getName())
	                .vendorId(product.getVendorId())
	                .quantity(item.getQuantity())
	                .price(product.getPrice())
	                .image(product.getImage())
	                .build();

	        reservedItemDetailsList.add(itemDetails);
		}
		
		return reservedItemDetailsList;
				
	}

	@Override
	@Transactional
	public Boolean confirmStock(UUID orderId) {
		List<StockReservation> reservations= reservationRepository.findByOrderIdAndStatus(orderId,  ReservationStatus.PENDING);
		if(reservations.isEmpty()) {
			return false;
		}
		for(StockReservation reservation : reservations) {
			Product product = productRepository.findById(reservation.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
			
			product.setReservedQuantity(product.getReservedQuantity()-reservation.getQuantity());
			reservation.setStatus(ReservationStatus.CONFIRMED);
			
			productRepository.save(product);
			reservationRepository.save(reservation);
		}
		
		productSaleService.updateSales(orderId);
		return true;
		
	}

	@Override
	@Transactional
	public Boolean releaseStock(UUID orderId) {
	List<StockReservation> reservations = reservationRepository
			.findByOrderIdAndStatus(orderId, ReservationStatus.PENDING);
	
	if(reservations.isEmpty()) {
		return false;
	}
	for(StockReservation reservation : reservations) {
		Product product = productRepository.findById(reservation.getProductId()).orElse(null);
		
		if (product != null) {
            // Restore reserved stock back to available pool
            product.setAvailableQuantity(product.getAvailableQuantity() + reservation.getQuantity());
            product.setReservedQuantity(product.getReservedQuantity() - reservation.getQuantity());
            productRepository.save(product);
        }
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
	}
		return true;
	}

	@Override
	@Transactional
	public void releaseExpiredReservations() {
		List<StockReservation> expiredList = reservationRepository.findExpiredReservations(
                ReservationStatus.PENDING,
                LocalDateTime.now()
        );
		
		if (expiredList.isEmpty()) {
            return;
        }
		
		log.info("Cron execution: Found {} abandoned/expired reservations to clean up.", expiredList.size());

        for (StockReservation reservation : expiredList) {
            try {
                Product product = productRepository.findById(reservation.getProductId()).orElse(null);
                if (product != null) {
                    product.setAvailableQuantity(product.getAvailableQuantity() + reservation.getQuantity());
                    product.setReservedQuantity(product.getReservedQuantity() - reservation.getQuantity());
                    productRepository.save(product);
                }
                reservation.setStatus(ReservationStatus.EXPIRED);
                reservationRepository.save(reservation);

                log.info("Expired stock auto-released for OrderId: {}, ProductId: {}, Qty: {}",
                        reservation.getOrderId(), reservation.getProductId(), reservation.getQuantity());

            } catch (Exception e) {
                log.error("Failed releasing expired reservation for OrderId: {}", reservation.getOrderId(), e);
            }
        }
	}
	
	
}
