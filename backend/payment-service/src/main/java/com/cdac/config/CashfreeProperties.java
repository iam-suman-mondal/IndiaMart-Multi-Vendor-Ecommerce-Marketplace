package com.cdac.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "cashfree")
public class CashfreeProperties {

	private String backendUrl;
	
	private String clientId;
	
	private String clientSecret;
	
}
