package com.cdac.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdac.entities.ReservationStatus;
import com.cdac.entities.StockReservation;

public interface StockReservationRepository extends JpaRepository<StockReservation, Long>{
	List<StockReservation> findByOrderIdAndStatus(UUID orderId, ReservationStatus status);

    @Query("SELECT r FROM StockReservation r WHERE r.status = :status AND r.expiresAt < :now")
    List<StockReservation> findExpiredReservations(
            @Param("status") ReservationStatus status,
            @Param("now") LocalDateTime now
    );

	List<StockReservation> findByOrderId(UUID orderId);
}
