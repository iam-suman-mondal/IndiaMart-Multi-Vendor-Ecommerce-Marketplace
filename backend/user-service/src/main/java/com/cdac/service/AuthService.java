package com.cdac.service;

import org.jspecify.annotations.Nullable;

import com.cdac.dto.ApiResponse;
import com.cdac.dto.ForgetPasswordDto;
import com.cdac.dto.LoginRequest;
import com.cdac.dto.LoginResponseDTO;
import com.cdac.dto.ResetPasswordDTO;
import com.cdac.dto.UpdatePasswordDto;

public interface AuthService {

LoginResponseDTO login(LoginRequest request);

void updatePassword(Long userId, String email, UpdatePasswordDto request);

void forgetPassword(ForgetPasswordDto request);

void resetPassword(ResetPasswordDTO request);

void banUnban(Long adminId, String adminEmail, Long userId);

LoginResponseDTO refreshAccessToken(String refreshToken);

//@Nullable 
//ApiResponse login(LoginRequest request);
 
} 
  