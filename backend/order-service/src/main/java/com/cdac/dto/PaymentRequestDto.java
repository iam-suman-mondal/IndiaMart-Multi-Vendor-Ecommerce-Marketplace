package com.cdac.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDto {

	private UUID orderId;

	private BigDecimal amount;
	
    private Long customerId;

    private String customerPhoneNo;
    
    private String customerName;
    
    private String customerEmail;	
	
}
