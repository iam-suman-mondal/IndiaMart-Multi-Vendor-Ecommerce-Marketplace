package com.cdac.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entities.ProductSales;
import com.cdac.entities.WeeklyProductSales;

public interface ProductSalesRepository extends JpaRepository<ProductSales, Long>{
	List<ProductSales> findTop5ByOrderByTotalQuantitySoldDesc();
}