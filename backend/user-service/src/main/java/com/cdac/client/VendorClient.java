package com.cdac.client;

//import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cdac.dto.ForgetPasswordDto;
import com.cdac.dto.UpdatePasswordDto;


//@FeignClient(
//        name = "vendor-service",
//        url = "${vendor.service.url}"
//)

public interface VendorClient {

    @PatchMapping("/vendors/{userId}/password")
    void updateVendorPassword(
            @PathVariable("userId") Long userId,
            @RequestBody UpdatePasswordDto request
    );
    @PostMapping("/vendors/forget-password")
    void forgetPassword(
            @RequestBody ForgetPasswordDto request
    );

}
