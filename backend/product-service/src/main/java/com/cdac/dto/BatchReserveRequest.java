package com.cdac.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BatchReserveRequest {
	@NotNull
    private UUID orderId;

    @NotEmpty(message = "Items list cannot be empty")
    @Valid
    private List<OrderItemDto> items;

    private Integer ttlMinutes = 15;
}
