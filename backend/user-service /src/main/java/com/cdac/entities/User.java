package com.cdac.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "password")
@Table(name="users")
public class User {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(unique = true, nullable = false,length=30)
	    private String email;

	    @Column(nullable = false, length = 300)
	    private String password;

	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private Role role;

	    @Column(nullable = false ,length = 30)
	    private String name;

	    @Column(nullable = false)
	    private Boolean isActive=true;
	    
	    
	    @CreationTimestamp
	    @Column(nullable = false, updatable = false)
	    private LocalDateTime createdOn;

	    @UpdateTimestamp
	    @Column(nullable = false)
	    private LocalDateTime updatedOn;
	    @Column(length = 100 ,nullable = false)
	    private String address;
	    @Column(length = 14, unique = true)
	    private String phoneNo;


		public User( String email, String password, Role role, String name,String address,String phoneNo) {
//			super();
			
			this.email = email;
			this.password = password;
			this.role = role;
			this.name = name;
			this.address=address;
			this.phoneNo=phoneNo;
		}
	    
	    

}
