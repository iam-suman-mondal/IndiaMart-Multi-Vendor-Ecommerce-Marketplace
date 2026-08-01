package com.cdac.service;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.entities.Product;
import com.cdac.entities.ProductSales;
import com.cdac.entities.ReservationStatus;
import com.cdac.entities.StockReservation;
import com.cdac.entities.WeeklyProductSales;
import com.cdac.repository.ProductRepository;
import com.cdac.repository.ProductSalesRepository;
import com.cdac.repository.StockReservationRepository;
import com.cdac.repository.WeeklyProductsSalesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductSalesService {

	private final StockReservationRepository reservationRepository;

    private final ProductSalesRepository salesRepository;
    private final ProductRepository productRepository;



    @Transactional
    public void updateSales(UUID orderId){


        List<StockReservation> reservations =
                reservationRepository
                .findByOrderIdAndStatus(
                        orderId,
                        ReservationStatus.CONFIRMED
                );


        for(StockReservation reservation : reservations){


            Long productId =
                    reservation.getProductId();


            Integer quantity =
                    reservation.getQuantity();



            ProductSales sales =
                    salesRepository.findById(productId)
                    .orElseGet(() -> {


                        ProductSales ps =
                                new ProductSales();


                        ps.setProductId(productId);

                        ps.setTotalQuantitySold(0L);

                        ps.setTotalOrders(0L);


                        return ps;

                    });



            sales.setTotalQuantitySold(
                    sales.getTotalQuantitySold()
                    + quantity
            );


            sales.setTotalOrders(
                    sales.getTotalOrders()
                    + 1
            );


            salesRepository.save(sales);

        }

    }
    

    public List<Product> getBestSellingProducts(){


        List<Long> ids =
                salesRepository
                .findTop5ByOrderByTotalQuantitySoldDesc()
                .stream()
                .map(ProductSales::getProductId)
                .toList();



        return productRepository.findByProductIdIn(ids);

    }

}