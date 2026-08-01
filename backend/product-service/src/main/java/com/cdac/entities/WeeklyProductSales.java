package com.cdac.entities;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="weekly_product_sales")
@Getter
@Setter
public class WeeklyProductSales {
    @Id
    private Long productId;


    private Long weeklyQuantitySold = 0L;


    private LocalDate weekStartDate;


}