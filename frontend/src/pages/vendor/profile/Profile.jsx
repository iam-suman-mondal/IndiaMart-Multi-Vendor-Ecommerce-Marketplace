import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
const Profile = () => {
  const navigate=useNavigate()
  // 1. Core Profile State Fields
  const [formData, setFormData] = useState({
  firstName: 'Rahul', // Updated name here
  lastName: '',
  email: 'rahul@institute.com',
  password: '••••••••',
  address: 'Main Institute Street, Campus Area',
  vendorId: 'VND-2026-96469',
  businessName: 'Apex Tech Solutions',
  gstNumber: '27AAAAA1111A1Z1',
  aadhaarNo: '1234 5678 9012'
});
  return (
   <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          
          <div className="card border-0 shadow-sm p-4 p-md-5 bg-white">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between pb-4 mb-4 border-bottom">
              <div>
                <h2 className="fw-bold text-dark mb-1">Vendor Profile</h2>
                <p className="text-muted m-0 small">Official registration credentials and profile summary.</p>
              </div>
              <div className="mt-3 mt-sm-0">
                <span className="badge bg-dark px-3 py-2 fs-6 fw-semibold rounded">
                  ID: {formData.vendorId}
                </span>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">First Name</label>
                <input type="text" className="form-control bg-light" value={formData.firstName} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Last Name</label>
                <input type="text" className="form-control bg-light" value={formData.lastName || '—'} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Email Address</label>
                <input type="email" className="form-control bg-light" value={formData.email} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Account Password</label>
                <input type="text" className="form-control bg-light text-muted" value={formData.password} readOnly />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold text-secondary small">Legal Business Name</label>
                <input type="text" className="form-control bg-light fw-semibold text-dark" value={formData.businessName} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">GSTIN / Tax Registration</label>
                <input type="text" className="form-control bg-light font-monospace" value={formData.gstNumber} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Aadhaar ID Number</label>
                <input type="text" className="form-control bg-light" value={formData.aadhaarNo} readOnly />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold text-secondary small">Registered Operational Address</label>
                <textarea className="form-control bg-light" rows="2" value={formData.address} readOnly />
              </div>

              <div className="col-12 pt-3 border-top d-flex justify-content-end">
                {/* Navigates to the edit screen */}
                <button 
                  type="button" 
                  className="btn btn-primary px-5 fw-bold shadow-sm"
                  onClick={() => navigate('/vendor/profile/edit')}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile