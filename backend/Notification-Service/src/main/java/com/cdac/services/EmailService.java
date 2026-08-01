package com.cdac.services;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cdac.dto.NotificationDto;

import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
	 private final JavaMailSender mailSender;
	 
	 public void sendEmail(
	            String to,
	            String subject,
	            String message) {


	        SimpleMailMessage mail = new SimpleMailMessage();
	        mail.setFrom("your-email@gmail.com");
	        mail.setTo(to);
	        mail.setSubject(subject);
	        mail.setText(message);

	        try {
	        	log.info("Sending email to {}", to);
	            mailSender.send(mail);
	            log.info("Email sent successfully.");

	        } catch (Exception ex) {
	        	log.error("Email sending failed", ex);
	            throw new RuntimeException("Unable to send email", ex);

	        }
	    }
}
