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
@Table(name = "vendors")
@Getter
@Setter
@ToString(exclude = "user")
@NoArgsConstructor
@AllArgsConstructor
public class Vendor {

    @Id
    @Column(name = "vendor_id")
    private Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    @MapsId
    @JoinColumn(name = "vendor_id", nullable = false, unique = true)
    private User user;

    @Column(name = "company_name", nullable = false, unique = true, length = 100)
    private String companyName;

    @Column(name = "gst_no", nullable = false, unique = true, length = 15)
    private String gstNo;

    @Column(name = "pan_no", nullable = false, unique = true, length = 10)
    private String panNo;

    @Column(name = "contact_no", nullable = false, unique = true, length = 14)
    private String contactNo;
}