import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: 'Rahul',
    lastName: '',
    email: 'rahul@institute.com',
    password: '••••••••',
    address: 'Main Institute Street, Campus Area',
    vendorId: 'VND-2026-96469',
    businessName: 'Apex Tech Solutions',
    gstNumber: '27AAAAA1111A1Z1',
    aadhaarNo: '[Aadhaar Redacted]' // Kept secure as placeholder text
  });

  // 2. The critical handler that unlocks your inputs and lets you type
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value // Updates the specific field being typed into
    }));
  };

  const handleSave = () => {
    console.log('Saved changes:', formData);
    
    // 3. Updated to use react-toastify syntax
    toast.success('Profile changes saved successfully!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Slightly delayed redirect so the user sees the toast
    setTimeout(() => {
      navigate('/vendor/profile');
    }, 1800);
  };

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      {/* 4. react-toastify container required to render the notification */}
      <ToastContainer />

      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          
          <div className="card border-0 shadow-sm p-4 p-md-5 bg-white">
            <div className="pb-4 mb-4 border-bottom">
              <h2 className="fw-bold text-dark mb-1">Modify Profile Details</h2>
              <p className="text-muted m-0 small">Edit your information below. Fields marked with lock icons are permanent.</p>
            </div>

            <div className="row g-4">
              {/* Vendor ID - Locked out */}
              <div className="col-12">
                <label className="form-label fw-semibold text-danger small">Vendor ID (Unmodifiable)</label>
                <div className="input-group">
                  <span className="input-group-text bg-secondary-subtle border-secondary-subtle text-secondary">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control bg-secondary-subtle text-secondary border-secondary-subtle fw-bold" 
                    value={formData.vendorId} 
                    disabled 
                  />
                </div>
              </div>

              {/* All input fields below now have matching 'name' attributes and 'onChange' fired */}
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">First Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Last Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  placeholder="Enter last name" 
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Account Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold text-secondary small">Legal Business Name</label>
                <input 
                  type="text" 
                  className="form-control fw-semibold" 
                  name="businessName" 
                  value={formData.businessName} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">GSTIN / Tax Registration</label>
                <input 
                  type="text" 
                  className="form-control font-monospace" 
                  name="gstNumber" 
                  value={formData.gstNumber} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Aadhaar ID Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="aadhaarNo" 
                  value={formData.aadhaarNo} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold text-secondary small">Registered Operational Address</label>
                <textarea 
                  className="form-control" 
                  rows="2" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-12 pt-3 border-top d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary px-4 fw-medium" onClick={() => navigate('/vendor/profile')}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-success px-5 fw-bold shadow-sm"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;