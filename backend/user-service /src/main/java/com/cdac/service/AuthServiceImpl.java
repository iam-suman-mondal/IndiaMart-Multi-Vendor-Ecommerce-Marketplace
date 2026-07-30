package com.cdac.service;

import org.springframework.security.crypto.password.PasswordEncoder;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//import com.cdac.client.VendorClient;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.ForgetPasswordDto;
import com.cdac.dto.LoginRequest;
import com.cdac.dto.LoginResponseDTO;
import com.cdac.dto.ResetPasswordDTO;
import com.cdac.dto.UpdatePasswordDto;
import com.cdac.entities.Admin;
import com.cdac.entities.Customers;
import com.cdac.entities.Role;
import com.cdac.entities.User;

import com.cdac.repository.CustomerRepository;
import com.cdac.repository.UserRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService{
	private final UserRepository userRepo;
     private final PasswordEncoder passwordEncoder;
     private final CustomerRepository customerRepo;
//     private final CentralLoggerService centralLogger;
   private final OtpService otpService;
  
//     private final VendorClient vendorClient ; 
	@Override
	public LoginResponseDTO login(LoginRequest request) {
		
		// TODO Auto-generated method stub
		 User user = userRepo
	                .findByEmail(request.getEmail())
	                .orElseThrow(() ->
	                    new RuntimeException("Invalid email or password")
	                );

	        boolean passwordMatches =
	                passwordEncoder.matches(
	                    request.getPassword(),
	                    user.getPassword()
	                );
//		 if (!request.getPassword().equals(user.getPassword())) {
//		        throw new RuntimeException("Invalid email or password");
//		    }


	        if (!passwordMatches) {
	            throw new RuntimeException(
	                "Invalid email or password"
	            );
	        }
		return  new LoginResponseDTO( user.getId(),user.getEmail(),user.getName(),user.getRole());
	}
	@Override
	public void updatePassword(Long userId, String email, UpdatePasswordDto request) {
		 // 1. Find user
	    User user = userRepo.findById(userId)
	            .orElseThrow(() ->
	                    new RuntimeException("User not found"));

	    // 2. Verify email
	    if (!user.getEmail().equals(email)) {
	        throw new RuntimeException("User email does not match");
	    }

	    // 3. Check old password using BCrypt
	    if (!passwordEncoder.matches(
	            request.getOldPassword(),
	            user.getPassword())) {

	        throw new RuntimeException("Old password is incorrect");
	    }

	    // 4. Encode new password
	    String encodedPassword =
	            passwordEncoder.encode(request.getNewPassword());

	    // 5. Update User password
	    user.setPassword(encodedPassword);

	    // 6. Get role
	    Role role = user.getRole();

	    // 7. Save User
	    userRepo.save(user);

//	    // 8. Update Customer password
//	    if (role == Role.ROLE_CUSTOMER) {
//
//	        Customers customer = customerRepo.findById(userId)
//	                .orElseThrow(() ->
//	                        new RuntimeException("Customer not found"));
//
//	        customer.setPassword(encodedPassword);
//
//	        customerRepo.save(customer);
//
//	    } else if (role == Role.ROLE_VENDOR) {
//
//	        // Call Vendor microService here if required
//
//	    } else if (role == Role.ROLE_ADMIN) {
//	    	User  admin = userRepo.findById(userId)
//	                .orElseThrow(() ->
//	                        new RuntimeException("Admin not found"));
//
//	        admin.setPassword(encodedPassword);
//
//	        userRepo.save(admin);
//
//	        // Only User table password is updated
//
//	    } else {
//
//	        throw new RuntimeException("Invalid user role");
//		
//	}
	   

}
	@Override
	public void forgetPassword(ForgetPasswordDto request) {
		// TODO Auto-generated method stub
		
		 // Find User
        User user = userRepo
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));


        // Check role
        Role role = user.getRole();


        // Only Customer and Vendor
        if (role != Role.ROLE_CUSTOMER
                && role != Role.ROLE_VENDOR) {

            throw new RuntimeException(
                    "Password reset is not allowed"
            );
        }


        // Generate OTP
        String otp =
                otpService.generateOtp(
                        request.getEmail()
                );


        // Send OTP by email
        // emailService.sendOtp(
        //     request.getEmail(),
        //     otp
        // );

        System.out.println(
                "OTP = " + otp
        );
    }
	@Override
	public void resetPassword(ResetPasswordDTO request) {
		// TODO Auto-generated method stub
		  // 1. Verify OTP
        boolean validOtp =
                otpService.verifyOtp(
                        request.getEmail(),
                        request.getOtp()
                );

        if (!validOtp) {

            throw new RuntimeException(
                    "Invalid or expired OTP"
            );
        }


        // 2. Find User
        User user = userRepo
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));


        // 3. Get Role
        Role role = user.getRole();


        // ============================
        // CUSTOMER
        // ============================

//        if () {

            // Check Customer exists
//          Customers customer=  customerRepo.findById(user.getId())
//                    .orElseThrow(() ->
//                            new RuntimeException(
//                                    "Customer not found"
//                            ));


            // BCrypt encode password
            String encodedPassword =
                    passwordEncoder.encode(
                            request.getNewPassword()
                    );


            // Update User password
            user.setPassword(
                    encodedPassword
            );

//            customer.setPassword(encodedPassword);
            // Save User
            userRepo.save(user);
//        }


        // ============================
        // VENDOR
        // ============================

//        else if (role == Role.ROLE_VENDOR) {
//
//            
//
//
//            // Call Vendor Microservice
//           
//        }


        // ============================
        // OTHER ROLE
        // ============================

//        else {
//
//            throw new RuntimeException(
//                    "Only Customer and Vendor can reset password"
//            );
//        }


        // Delete OTP after successful reset
        otpService.deleteOtp(
                request.getEmail()
        );
		
	}
	@Override
	public void banUnban(Long adminId, String adminEmail, Long userId) {
		// TODO Auto-generated method stub
		// 1. Find logged-in user
        User admin = userRepo.findById(adminId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Admin not found"
                        ));

        // 2. Verify email
        if (!admin.getEmail().equals(adminEmail)) {
            throw new RuntimeException(
                    "Admin email does not match"
            );
        }

        // 3. Check role from User table
        if (admin.getRole() != Role.ROLE_ADMIN) {
            throw new RuntimeException(
                    "Only admin can ban or unban users"
            );
        }

        // 4. Find target user
        User targetUser = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Target user not found"
                        ));

        // 5. Prevent admin from banning another admin
        if (targetUser.getRole() == Role.ROLE_ADMIN) {
            throw new RuntimeException(
                    "Admin cannot ban or unban another admin"
            );
        }

        // 6. Toggle active status
        targetUser.setIsActive(
                !targetUser.getIsActive()
        );

        // 7. Save
        userRepo.save(targetUser);
		
	}

	
	
}
