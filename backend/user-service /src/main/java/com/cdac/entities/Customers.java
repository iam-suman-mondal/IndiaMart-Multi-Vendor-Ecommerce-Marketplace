package com.cdac.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Table
(name = "customers")
@Getter
@Setter
//@ToString(exclude ="password")
@NoArgsConstructor
@AllArgsConstructor
public class Customers {
	@Id
	@Column(name="customer_id")
    private Long id;
//	
//	@Column(nullable = false ,length = 30)
//    private String name;

//	
//	 @Column(unique = true, nullable = false,length=300)
//	    private String email;

//	    @Column(length=300,nullable = false)
//	    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name="customer_id",nullable = false, unique = true)
    private User user;

//    @Column(length = 14, unique = true)
//    private String phoneNo;
//    @Column(length = 100 ,nullable = false)
//    private String address;

    @Column(length = 50)
    private String city;

    @Column(length = 50,nullable = false)
    private String state;

    @Column(length = 10,nullable = false)
    private String pincode;

	public Customers(  String city,String state, String pincode) {
//		super();
//		this.id = id;
//		this.name=name;
//		this.email = email;
//		this.password = password;
//		this.user = user;
//		this.phoneNo = phoneNo;
//		this.address = address;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
	}
    
    
    
}
