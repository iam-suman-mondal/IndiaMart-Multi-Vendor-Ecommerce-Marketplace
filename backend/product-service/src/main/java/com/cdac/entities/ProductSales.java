package com.cdac.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ProductSales {


    @Id
    private Long productId;

    private Long totalQuantitySold = 0L;

    private Long totalOrders = 0L;
}