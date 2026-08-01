package com.cdac.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
	
	List<Order> findByCustomerId(Long customerId);
	
	@Query("""
	        SELECT COUNT(o)
	        FROM Order o
	        WHERE YEARWEEK(o.createdAt, 1) = YEARWEEK(CURRENT_DATE, 1)
	        """)
	    Long getAdminWeeklyOrders();
}
