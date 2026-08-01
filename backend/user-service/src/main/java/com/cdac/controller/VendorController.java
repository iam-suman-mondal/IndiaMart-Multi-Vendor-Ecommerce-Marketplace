package com.cdac.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.VerifyOtpRequest;
import com.cdac.security.JwtUtils;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.VendorDto;
import com.cdac.service.OtpService;
import com.cdac.service.VendorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/vendor")
@RequiredArgsConstructor
public class VendorController {

	private final OtpService otpService;
    private final VendorService vendorService;

    @GetMapping("/profile")
    public ResponseEntity<VendorDto> getProfile(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader) {
        
        if (userIdHeader == null || userIdHeader.isBlank()) {
            return ResponseEntity.status(401).build();
        }

        Long vendorId = Long.parseLong(userIdHeader);
        VendorDto profile = vendorService.getVendorProfileById(vendorId);

        return ResponseEntity.ok(profile);
    }
    
    
    
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse> updateProfile(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader,
            @Valid @RequestBody VendorDto vendorDto) {
        
        if (userIdHeader == null || userIdHeader.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Long vendorId = Long.parseLong(userIdHeader);
        ApiResponse response = vendorService.updateVendor(vendorId, vendorDto);

        return ResponseEntity.ok(response);
    }
    
    
    
    @DeleteMapping("/profile")
    public ResponseEntity<ApiResponse> deleteProfile(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader) {

        if (userIdHeader == null || userIdHeader.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Long vendorId = Long.parseLong(userIdHeader);

        ApiResponse response = vendorService.deleteVendor(vendorId);

        return ResponseEntity.ok(response);
    }
}