package com.multivendor.apigateway.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .logout(ServerHttpSecurity.LogoutSpec::disable)
                .authorizeExchange(exchange -> exchange
                        // Preflight request allow
                        .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        
                        // Public routes
                        .pathMatchers(
                                "/auth/**",
                                "/vendor/signup",
                                "/ecommerce/login",
                                "/customers/**"
                        )
                        .permitAll()

                        // Role-based route definitions handled at the security level
                        .pathMatchers("/api/orders/**")
                        .hasRole("USER")

                        .pathMatchers("/api/inventory/**")
                        .hasRole("ADMIN")

                        .anyExchange()
                        .permitAll()
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .build();
    }
    
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of(
        		"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        		));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}