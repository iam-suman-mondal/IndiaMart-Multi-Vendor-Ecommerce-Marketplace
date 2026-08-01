package com.cdac.controller;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.CustomerDto;
import com.cdac.dto.EmailNotificationDto;
import com.cdac.dto.ForgetPasswordDto;
import com.cdac.dto.LoginRequest;
import com.cdac.dto.LoginResponseDTO;
import com.cdac.dto.ResetPasswordDTO;
import com.cdac.dto.UpdatePasswordDto;
import com.cdac.dto.VendorDto;
import com.cdac.dto.VerifyOtpRequest;
import com.cdac.service.AuthService;
import com.cdac.service.CustomerService;
import com.cdac.service.NotificationProducer;
import com.cdac.service.OtpService;
import com.cdac.service.VendorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
private final AuthService authService ;
private final OtpService otpService;
private final CustomerService customerService;
private final VendorService vendorService;
private final NotificationProducer notificationProducer;

@PostMapping("/customers/signup")
public ResponseEntity<?> signup(
@Valid @RequestBody CustomerDto request) {

    // 1. Generate OTP
    // 2. Store Customer Details + OTP in Redis

    String otp =
            otpService.generateOtp(request.getEmail());


    // For testing: Print OTP
    System.out.println(
            "================================"
    );

    System.out.println(
            "Email : " + request.getEmail()
    );

    System.out.println(
            "OTP : " + otp
    );

    System.out.println(
            "Expires in : 5 minutes"
    );

    System.out.println(
            "================================"
    );
    
    otpService.storeSignupData(request.getEmail(),request);
    EmailNotificationDto dto = new EmailNotificationDto();

    dto.setUserEmail(request.getEmail());

    dto.setSubject("Vendor Registration OTP");

    dto.setMessage(
            "Dear Vendor,\n\n" +
            "Your OTP is: " + otp +
            "\n\nValid for 5 minutes."
    );

    notificationProducer.sendEmail(dto);


    return ResponseEntity.ok(
            "Signup initiated. OTP sent successfully."
    );
}


//1. INITIATE VENDOR SIGNUP & SEND OTP
@PostMapping("/vendor-signup")
public ResponseEntity<?> vendorSignUp(@Valid @RequestBody VendorDto request) {

 // Generate OTP and store vendor data in Redis
 String otp = otpService.generateOtp(request.getEmail());

 // For testing: Print OTP to console
 System.out.println("================================");
 System.out.println("Vendor Email : " + request.getEmail());
 System.out.println("OTP : " + otp);
 System.out.println("Expires in : 5 minutes");
 System.out.println("================================");

 otpService.storeSignupData(request.getEmail(), request);
 EmailNotificationDto dto = new EmailNotificationDto();

 dto.setUserEmail(request.getEmail());

 dto.setSubject("Vendor Registration OTP");

 dto.setMessage(
         "Dear Vendor,\n\n" +
         "Your OTP is: " + otp +
         "\n\nValid for 5 minutes."
 );

 notificationProducer.sendEmail(dto);

 return ResponseEntity.ok(
         "Vendor signup initiated. OTP sent successfully."
 );
}
//2. VERIFY OTP & COMPLETE VENDOR REGISTRATION
@PostMapping("/verify-vendor-signup")
public ResponseEntity<?> verifyVendorSignup(@Valid @RequestBody VerifyOtpRequest reqVerify) {

 boolean isOtpValid = otpService.verifyOtp(
         reqVerify.getEmail(),
         reqVerify.getOtp()
 );

 if (!isOtpValid) {
     return ResponseEntity
             .badRequest()
             .body("Invalid or expired OTP");
 }

 // Retrieve vendor DTO from Redis and register using VendorSignUp
 VendorDto vendorDto = otpService.getSignupData(reqVerify.getEmail(), VendorDto.class);
 
 vendorService.VendorSignUp(vendorDto);

 return ResponseEntity.status(HttpStatus.CREATED)
         .body("Vendor registered successfully");
}




@PostMapping("/customers/verify-signup")
public ResponseEntity<?> verifySignup(

  @Valid @RequestBody VerifyOtpRequest reqVerify) {


    // Verify OTP
    // If correct, get Customer data
    // from Redis

       boolean signupRequest =
            otpService.verifyOtp(
                    reqVerify.getEmail(),
                    reqVerify.getOtp()
            );


    // =========================================
    // OTP WRONG OR EXPIRED
    // =========================================

    if (signupRequest == false) {

        return ResponseEntity
                .badRequest()
                .body(
                    "Invalid or expired OTP"
                );
    }

  
    
    customerService.CustomerAndUserRegister(otpService.getSignupData(reqVerify.getEmail(),CustomerDto.class));
    
     
    return ResponseEntity.status(HttpStatus.CREATED)
            .body("Customer registered successfully");





}



@PostMapping("/refresh")
public ResponseEntity<LoginResponseDTO> refreshToken(
        @RequestHeader("Authorization") String authHeader) {

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.badRequest().build();
    }

    String refreshToken = authHeader.substring(7);

    return ResponseEntity.ok(
            authService.refreshAccessToken(refreshToken));
}



@PostMapping("/login")
public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequest request) {
LoginResponseDTO response = authService.login(request);
return ResponseEntity.ok(response);
}

	@PatchMapping("/update-password")
	public ResponseEntity<?> updatePassword(
			@RequestHeader("X-User-Id") Long userId,
	        @RequestHeader("X-User-Email") String email,
	      @Valid  @RequestBody UpdatePasswordDto request) {

        authService.updatePassword(
                userId,
                email,
                request
        );


	    return ResponseEntity.ok("Password updated successfully");
	}
	 // Send OTP
    @PostMapping("/forget-password")
    public ResponseEntity<?> forgetPassword(
            @Valid @RequestBody ForgetPasswordDto request) {

        authService.forgetPassword(request);

        return ResponseEntity.ok(
                "OTP sent successfully"
        );
    }


    // Reset Password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
           @Valid @RequestBody ResetPasswordDTO request) {

        authService.resetPassword(request);

        return ResponseEntity.ok(
                "Password reset successfully"
        );
    }
}
