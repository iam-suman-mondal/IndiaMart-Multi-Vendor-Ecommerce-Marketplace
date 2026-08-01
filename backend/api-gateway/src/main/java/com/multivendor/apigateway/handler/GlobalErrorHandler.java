package com.multivendor.apigateway.handler;

import java.time.LocalDateTime;

import org.springframework.boot.webflux.error.ErrorWebExceptionHandler;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.multivendor.apigateway.dto.ErrorResponse;
import com.multivendor.apigateway.exception.AccessDeniedException;
import com.multivendor.apigateway.exception.InvalidJwtException;
import com.multivendor.apigateway.exception.JwtExpiredException;
import com.multivendor.apigateway.exception.MissingTokenException;

import reactor.core.publisher.Mono;

@Component
@Order(-2)
public class GlobalErrorHandler implements ErrorWebExceptionHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {

        HttpStatus status;
        String message;

        if (ex instanceof MissingTokenException) {
            status = HttpStatus.UNAUTHORIZED;
            message = ex.getMessage();
        }

        else if (ex instanceof InvalidJwtException) {
            status = HttpStatus.UNAUTHORIZED;
            message = ex.getMessage();
        }

        else if (ex instanceof JwtExpiredException) {
            status = HttpStatus.UNAUTHORIZED;
            message = ex.getMessage();
        }

        else if (ex instanceof AccessDeniedException) {
            status = HttpStatus.FORBIDDEN;
            message = ex.getMessage();
        }

        else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = "Internal Server Error";
        }

        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message
        );

        exchange.getResponse().setStatusCode(status);
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);

        try {

            byte[] bytes = objectMapper.writeValueAsBytes(errorResponse);

            return exchange.getResponse().writeWith(
                    Mono.just(
                            exchange.getResponse()
                                    .bufferFactory()
                                    .wrap(bytes)
                    )
            );

        } catch (Exception e) {
            return Mono.error(e);
        }
    }
}