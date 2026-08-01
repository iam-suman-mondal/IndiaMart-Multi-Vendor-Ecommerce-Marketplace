package com.cdac.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.AdminDashboardAnalyticsDto;
import com.cdac.dto.CustomerProfileDTO;
import com.cdac.service.AuthService;
import com.cdac.service.CustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
//@RequestMapping("/customers")
public class AdminController {
	private final CustomerService customerService;
	private final AuthService authService;

    // Customer-related API
    @GetMapping("/customers/{id}")
    @Validated
    public ResponseEntity<?> getCustomerDetailsById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerDetails(id));
    }

    // Only Admin can access this
    @GetMapping("/customers/all")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllCustomerDetails() {

        return ResponseEntity.ok(
                customerService.getAllCustomerDetails()
        );
    }
    @PutMapping("/customers/profile")
    public ResponseEntity<?> updateCustomerProfile(@Valid @RequestBody CustomerProfileDTO request) {
     
    	
//    	System.out.println(request.getId()request.getName());
        // update database 

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
               .body(customerService.updateProfile(request));

    
    }
    
    @PatchMapping("/ban-unban")
    public ResponseEntity<?> banUnban(
            @RequestHeader("X-User-Id") Long adminId,
            @RequestHeader("X-User-Email") String adminEmail,
            @RequestParam Long userId) {

        authService.banUnban(
                adminId,
                adminEmail,
                userId
        );

        return ResponseEntity.ok(
                "User ban/unban status updated successfully"
        );
    }
    
//    @PatchMapping("/update-password")
//    public ResponseEntity<?> updatePassword(
//            @RequestBody passwordDTO request) {
//
//        ApiResponse response = customerService.updatePassword(request);
//
//        return ResponseEntity.ok(response);
//    }
    
    // Only for Admin (returns customer and vendor count)
    @GetMapping("/dashboard/analytics")
    public ResponseEntity<AdminDashboardAnalyticsDto> getVendorDashboardAnalytics(@RequestParam String param) {
        return ResponseEntity.ok(null); // Todo
    }
    
    
}
