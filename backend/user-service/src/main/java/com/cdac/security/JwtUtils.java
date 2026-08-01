package com.cdac.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;

    private final long jwtExpirationMs = 9000000;      // 15 Minutes
    private final long refreshExpirationMs = 604800000; // 7 Days

    private SecretKey getSigningKey() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // ==========================
    // ACCESS TOKEN
    // ==========================

    public String generateAccessToken(Long id, String email, String role) {

        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiry)
                .claims(Map.of(
                        "id", id,
                        "email", email,
                        "role", role
                ))
                .signWith(getSigningKey())
                .compact();
    }

    // ==========================
    // REFRESH TOKEN
    // ==========================

    public String generateRefreshToken(String email) {

        Date now = new Date();
        Date expiry = new Date(now.getTime() + refreshExpirationMs);

        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiry)
                .claims(Map.of(
                        "email", email
                ))
                .signWith(getSigningKey())
                .compact();
    }

    // ==========================
    // COMMON METHODS
    // ==========================

    private Claims extractClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractEmail(String token) {
        return extractClaims(token).get("email", String.class);
    }

    public Long extractUserId(String token) {

        Object id = extractClaims(token).get("id");

        if (id instanceof Integer) {
            return ((Integer) id).longValue();
        }

        if (id instanceof Long) {
            return (Long) id;
        }

        return null;
    }

    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public boolean validateToken(String token) {

        try {

            extractClaims(token);
            return true;

        } catch (JwtException | IllegalArgumentException ex) {

            return false;
        }
    }
}