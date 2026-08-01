//package com.cdac.service;
//
//import java.time.LocalDateTime;
//
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.stereotype.Service;
//
//import com.cdac.config.RabbitMQConfig;
//import com.cdac.dto.NotificationDto;
//
//import lombok.RequiredArgsConstructor;
//
//
//@Service
//@RequiredArgsConstructor
//public class NotificationService {
//	
//	 private final RabbitTemplate rabbitTemplate;
//	 
//	 private void sendNotification(
//			 Long userId,
//			 String subject,
//			 String message
//			 ) {
//		 
//		  NotificationDto notification = new NotificationDto(
//	                userId,
//	                subject,
//	                message,
//	                LocalDateTime.now()
//	        );
//
//	        rabbitTemplate.convertAndSend(
//	                RabbitMQConfig.NOTIFICATION_QUEUE,
//	                notification
//	        );
//		 
//	 }
//	
//}
