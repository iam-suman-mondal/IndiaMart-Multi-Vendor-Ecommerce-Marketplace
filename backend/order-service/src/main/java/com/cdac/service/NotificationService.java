package com.cdac.service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.cdac.config.RabbitMQConfig;
import com.cdac.dto.NotificationDto;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class NotificationService {
	
	 private final RabbitTemplate rabbitTemplate;
	 
	 public void sendNotification(
			 String email,
			 String subject,
			 String message
			 ) {
		 
		  NotificationDto notification = new NotificationDto(
	                email,
	                subject,
	                message
	        );

	        rabbitTemplate.convertAndSend(
	                RabbitMQConfig.NOTIFICATION_QUEUE,
	                notification
	        );
		 
	 }
	
}
