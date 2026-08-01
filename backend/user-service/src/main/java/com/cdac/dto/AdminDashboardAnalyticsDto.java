package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardAnalyticsDto {
	
	private Long customerCount;
	private Long vendorCount;

}
