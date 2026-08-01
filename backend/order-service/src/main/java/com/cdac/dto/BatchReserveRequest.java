package com.cdac.dto;

import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BatchReserveRequest {

	private UUID orderId;
	
	private List<OrderItemRequestDto> items;
	
}
