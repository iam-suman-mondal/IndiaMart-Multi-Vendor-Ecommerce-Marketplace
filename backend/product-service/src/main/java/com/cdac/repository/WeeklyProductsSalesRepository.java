package com.cdac.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdac.entities.WeeklyProductSales;

public interface WeeklyProductsSalesRepository extends JpaRepository<WeeklyProductSales, Long> {
	List<WeeklyProductSales> 
	findTop5ByOrderByWeeklyQuantitySoldDesc();



	Optional<WeeklyProductSales>
	findByProductId(Long productId);
	 
}
