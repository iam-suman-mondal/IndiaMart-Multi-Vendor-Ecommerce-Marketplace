package com.cdac.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CashfreeWebhookDto {

    private UUID orderId;
    private String cfPaymentId;
    private String paymentStatus;
    private String paymentGroup;
}