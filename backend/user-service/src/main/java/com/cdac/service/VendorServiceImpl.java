package com.cdac.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dto.ApiResponse;
import com.cdac.dto.VendorDto;
import com.cdac.entities.Role;
import com.cdac.entities.User;
import com.cdac.entities.Vendor;
import com.cdac.repository.UserRepository;
import com.cdac.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VendorServiceImpl implements VendorService {

    private final UserRepository userRepo;
    private final VendorRepository vendorRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ApiResponse VendorSignUp(VendorDto request) {
        
        // 1. Password hashing using BCrypt
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 2. Create and save base User entity fields
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setName(request.getName());
        user.setRole(Role.ROLE_VENDOR);
        user.setPhoneNo(request.getPhoneNo()); // Updated from getContactNo()
        user.setAddress(request.getAddress());
        
        userRepo.save(user);

        // 3. Create and save Vendor entity linked via @MapsId
        Vendor vendor = new Vendor();
        vendor.setUser(user);
        vendor.setCompanyName(request.getCompanyName());
        vendor.setContactNo(request.getPhoneNo()); // Updated from getContactNo() (or request.getPhoneNo() depending on your Vendor entity property)
        vendor.setGstNo(request.getGstNo());
        vendor.setPanNo(request.getPanNo());

        vendorRepo.save(vendor);
      //Success Message
    

        return new ApiResponse("success", "created successfully");
    }
    
    @Override
    public VendorDto getVendorProfile(String email) {
        Vendor vendor = vendorRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Vendor not found with email: " + email));

        User user = vendor.getUser();

        VendorDto dto = new VendorDto();
        // Map fields from User entity
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(null); // Keep password null/hidden for security when viewing profile
        dto.setPhoneNo(user.getPhoneNo());
        dto.setAddress(user.getAddress());

        // Map fields from Vendor entity
        dto.setCompanyName(vendor.getCompanyName());
        dto.setGstNo(vendor.getGstNo());
        dto.setPanNo(vendor.getPanNo());

        return dto;
    }
    
    
    
    @Override
    public List<Vendor> getAllVendors() {
        return vendorRepo.findAll();
    }
    
    @Override
    public VendorDto getVendorProfileById(Long id) {
        Vendor vendor = vendorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));

        User user = vendor.getUser();

        VendorDto dto = new VendorDto();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(null);
        dto.setPhoneNo(user.getPhoneNo());
        dto.setAddress(user.getAddress());

        dto.setCompanyName(vendor.getCompanyName());
        dto.setGstNo(vendor.getGstNo());
        dto.setPanNo(vendor.getPanNo());

        return dto;
    }
    @Override
    public ApiResponse updateVendor(Long id, VendorDto vendorDto) {
        Vendor vendor = vendorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));

        // Update Vendor-specific fields
        vendor.setCompanyName(vendorDto.getCompanyName());
        vendor.setGstNo(vendorDto.getGstNo());
        vendor.setPanNo(vendorDto.getPanNo());
        vendor.setContactNo(vendorDto.getPhoneNo());

        // Update User-specific fields linked through @MapsId
        User user = vendor.getUser();
        if (user != null) {
            user.setName(vendorDto.getName());
            user.setEmail(vendorDto.getEmail());
            user.setPhoneNo(vendorDto.getPhoneNo());
            user.setAddress(vendorDto.getAddress());
            
            // Optional: update password only if provided/changed
            if (vendorDto.getPassword() != null && !vendorDto.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(vendorDto.getPassword()));
            }
        }

        vendorRepo.save(vendor);

        return new ApiResponse("success", "Vendor updated successfully");
    }

    
    
    
    @Override
    public ApiResponse deleteVendor(Long id) {
        if (!vendorRepo.existsById(id)) {
            throw new RuntimeException("Vendor not found with id: " + id);
        }
        
        // Because of @MapsId and foreign key constraints, 
        // deleting the vendor or corresponding user depends on cascade configurations.
        // Typically, deleting from vendorRepo or userRepo cascades correctly.
        vendorRepo.deleteById(id);

        return new ApiResponse("success", "Vendor deleted successfully");
    }

	@Override
	public Long getVendorCount() {
		return vendorRepo.count();
	}
}