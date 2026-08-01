package com.cdac.service;

import java.time.Duration;
import java.util.Random;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.cdac.dto.CustomerDto;
import com.cdac.entities.Customers;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class OtpService {
	private final RedisTemplate<String, Object> redisTemplate;

    private static final long OTP_EXPIRATION = 5;

    
    public void deleteOtp(String key) {
    	 redisTemplate.delete(key);

    	
    }
    public String generateOtp(String email) {

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        String key = "OTP:" + email;
        System.out.println(key);

        redisTemplate.opsForValue().set(
                key,
                otp,
                Duration.ofMinutes(OTP_EXPIRATION)
        );

        return otp;
    }
    public <T>void storeSignupData(String email,T request) {

        String key = "DATA:" + email;

        redisTemplate.opsForValue().set(
                key,
                request,
                Duration.ofMinutes(OTP_EXPIRATION)
        ); 
    }
    
    public <T> T getSignupData(String email,Class<T> type) {

        String key = "DATA:" + email;

        Object data = redisTemplate
                .opsForValue()
                .get(key);

        return  type.cast(data);
    }

    public boolean verifyOtp(String email, String otp) {

        String key = "OTP:" + email;
        

        Object storedOtp =
                redisTemplate.opsForValue().get(key);
        System.out.println(key);

        if (storedOtp == null) {
            return false;
        }

        if (storedOtp.equals(otp)) {

            // Delete OTP after successful verification
            redisTemplate.delete(key);

            return true;
        }

        return false;

}}
