package com.cdac.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.entity.VendorOrder;

@Repository
public interface VendorOrderRepository extends JpaRepository<VendorOrder, Long> {

	List<VendorOrder> findByVendorId(Long vendorId);
	
	@Query("""
			SELECT COALESCE(SUM(vo.subtotal - vo.commissionAmount), 0)
			FROM VendorOrder vo
			WHERE vo.vendorId = :vendorId
			AND vo.status = 'DELIVERED'
			AND YEARWEEK(vo.order.createdAt, 1) = YEARWEEK(CURRENT_DATE, 1)
			""")
			BigDecimal getVendorWeeklyIncome(Long vendorId);
	
	@Query("""
			SELECT COUNT(vo)
			FROM VendorOrder vo
			WHERE vo.vendorId = :vendorId
			AND YEARWEEK(vo.order.createdAt, 1) = YEARWEEK(CURRENT_DATE, 1)
			""")
			Long getVendorWeeklyOrders(Long vendorId);
	
	@Query(value = """
		    SELECT
			    DAYNAME(o.created_at) AS day,
			    SUM(vo.subtotal - vo.commission_amount) AS income
			FROM vendor_orders vo
			JOIN orders o ON vo.order_id = o.id
			WHERE vo.vendor_id = :vendorId
			  AND vo.status = 'DELIVERED'
			  AND YEARWEEK(o.created_at, 1) = YEARWEEK(CURDATE(), 1)
			GROUP BY DATE(o.created_at), DAYNAME(o.created_at)
			ORDER BY DATE(o.created_at);
		    """, nativeQuery = true)
		List<Object[]> getVendorWeeklySales(@Param("vendorId") Long vendorId);
	
	@Query("""
		    SELECT COALESCE(SUM(vo.commissionAmount), 0)
		    FROM VendorOrder vo
		    WHERE vo.status = 'DELIVERED'
		    AND YEARWEEK(vo.order.createdAt, 1) = YEARWEEK(CURRENT_DATE, 1)
		""")
		BigDecimal getAdminWeeklyIncome();

	@Query(value = """
		    SELECT
		        DAYNAME(o.created_at) AS day,
		        SUM(vo.commission_amount) AS income
		    FROM vendor_orders vo
		    JOIN orders o ON vo.order_id = o.id
		    WHERE vo.status = 'DELIVERED'
		      AND YEARWEEK(o.created_at, 1) = YEARWEEK(CURDATE(), 1)
		    GROUP BY DATE(o.created_at), DAYNAME(o.created_at)
		    ORDER BY DATE(o.created_at)
		    """, nativeQuery = true)
		List<Object[]> getAdminWeeklyRevenue();
}
