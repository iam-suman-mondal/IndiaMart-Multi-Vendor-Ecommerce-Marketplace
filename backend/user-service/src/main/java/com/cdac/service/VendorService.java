package com.cdac.service;

import java.util.List;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.VendorDto;
import com.cdac.entities.Vendor;

public interface VendorService {
    ApiResponse VendorSignUp(VendorDto request);
    List<Vendor> getAllVendors();
    VendorDto getVendorProfile(String email);
    ApiResponse updateVendor(Long id, VendorDto vendorDto);
    ApiResponse deleteVendor(Long id);
    VendorDto getVendorProfileById(Long id);
}