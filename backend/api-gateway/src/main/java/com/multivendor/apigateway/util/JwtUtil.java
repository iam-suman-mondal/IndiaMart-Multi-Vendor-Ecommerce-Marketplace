package com.multivendor.apigateway.util;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.multivendor.apigateway.exception.InvalidJwtException;
import com.multivendor.apigateway.exception.JwtExpiredException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).get("email", String.class);
    }

    public Long extractUserId(String token) {
        return extractAllClaims(token).get("id", Long.class);
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    /**
     * Validates the JWT.
     * Throws custom exceptions if validation fails.
     */
    public void validateToken(String token) {

        try {
            extractAllClaims(token);
        }

        catch (ExpiredJwtException e) {
            throw new JwtExpiredException("JWT has expired");
        }

        catch (MalformedJwtException e) {
            throw new InvalidJwtException("Malformed JWT");
        }

        catch (SignatureException e) {
            throw new InvalidJwtException("Invalid JWT signature");
        }

        catch (UnsupportedJwtException e) {
            throw new InvalidJwtException("Unsupported JWT");
        }

        catch (IllegalArgumentException e) {
            throw new InvalidJwtException("JWT token is empty");
        }

        catch (JwtException e) {
            throw new InvalidJwtException("Invalid JWT");
        }
    }
}