package com.cdac.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogMessage {

    private String serviceName;

    private String userRole;

    private Long userId;

    private String logLevel;

    private String message;

    private LocalDateTime timestamp;

    private String requestId;
}