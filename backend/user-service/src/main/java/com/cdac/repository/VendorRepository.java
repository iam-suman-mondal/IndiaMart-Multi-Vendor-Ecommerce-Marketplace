package com.cdac.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cdac.entities.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    Optional<Vendor> findByCompanyName(String companyName);
    Optional<Vendor> findByGstNo(String gstNo);
    Optional<Vendor> findByPanNo(String panNo);
    Optional<Vendor> findByContactNo(String contactNo);
    @Query("SELECT v FROM Vendor v JOIN v.user u WHERE u.email = :email")
    Optional<Vendor> findByUserEmail(String email);
}