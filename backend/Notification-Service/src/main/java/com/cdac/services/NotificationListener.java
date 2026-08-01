package com.cdac.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.cdac.config.RabbitMQConfig;
import com.cdac.dto.NotificationDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationListener {
private final EmailService emailService;

@RabbitListener(queues = RabbitMQConfig.NOTIFICATION_QUEUE)
public void receiveNotification(NotificationDto dto) {
	if(dto.getUserEmail()==null || dto.getUserEmail().isBlank()){

	    return;

	}
	if(dto.getSubject()==null || dto.getSubject().isBlank()){

	    return;

	}
	if(dto.getMessage()==null || dto.getMessage().isBlank()){

	    return;

	}
	log.info("Notification received for {}", dto.getUserEmail());
	emailService.sendEmail(
            dto.getUserEmail(),
            dto.getSubject(),
            dto.getMessage()
    );
	log.info("Email processed successfully.");
}
}
