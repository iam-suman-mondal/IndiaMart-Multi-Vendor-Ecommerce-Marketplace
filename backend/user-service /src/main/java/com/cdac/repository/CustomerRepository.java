package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cdac.dto.CustomerResponseDto;
import com.cdac.entities.Customers;

public interface CustomerRepository extends JpaRepository<Customers, Long> {

	
	  @Query("""
		        SELECT new com.cdac.dto.CustomerResponseDto(
		            u.id,
		            u.name,
		            u.email,
		            u.phoneNo,
		            u.address,
		            c.city,
		            c.state,
		            c.pincode
		        )
		        FROM Customers c
		        JOIN c.user u
		    """)
	
	List<CustomerResponseDto> getAllCustomers();
	
	
	

}
