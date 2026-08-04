package com.cdac.entity;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Reference to Product Service
    @Column(name = "product_id", nullable = false)
    private Long productId;

    // Snapshots
    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_image", nullable = false)
    private String productImage;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer quantity;
    
    @Enumerated(EnumType.STRING)
    private OrderItemStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_order_id", nullable = false)
    @JsonIgnore
    private VendorOrder vendorOrder;
}