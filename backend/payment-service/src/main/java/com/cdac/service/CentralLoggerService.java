package com.cdac.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.cdac.config.RabbitMQConfig;
import com.cdac.dto.LogMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CentralLoggerService {

  private final RabbitTemplate rabbitTemplate;

  public void info(
          String userRole,
          Long userId,
          String message
  ) {
      sendLog(
              userRole,
              userId,
              "INFO",
              message
      );
  }

  public void error(
          String userRole,
          Long userId,
          String message
  ) {
      sendLog(
              userRole,
              userId,
              "ERROR",
              message
      );
  }

  private void sendLog(
          String userRole,
          Long userId,
          String logLevel,
          String message
  ) {

      LogMessage logMessage = new LogMessage();

      logMessage.setServiceName("ProductService");

      logMessage.setUserRole(userRole);

      logMessage.setUserId(userId);

      logMessage.setLogLevel(logLevel);

      logMessage.setMessage(message);

      logMessage.setTimestamp(LocalDateTime.now());

      logMessage.setRequestId(
              UUID.randomUUID().toString()
      );

      rabbitTemplate.convertAndSend(
              RabbitMQConfig.LOG_QUEUE,
              logMessage
      );
  }
}