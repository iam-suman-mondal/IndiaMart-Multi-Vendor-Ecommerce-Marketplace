package com.cdac.config;

import java.math.BigDecimal;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "platform.order")
public class OrderProperties {

    private BigDecimal handlingFee;

    private BigDecimal deliveryCharges;

    private BigDecimal freeDeliveryAbove;

    private BigDecimal commission;
}