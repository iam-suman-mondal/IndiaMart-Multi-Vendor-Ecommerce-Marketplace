import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { getVendorProfile, updateVendorProfile } from "../../../apis/services/user-service";
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    address: '',
    companyName: '',
    gstNo: '',
    panNo: ''
  });

  const [loading, setLoading] = useState(true);

  // Fetch current data so the input boxes pre-populate with existing values
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getVendorProfile();
        setFormData({
          name: data.name || '',
          email: data.email || '',
          password: '', // leave blank unless changing
          phoneNo: data.phoneNo || '',
          address: data.address || '',
          companyName: data.companyName || '',
          gstNo: data.gstNo || '',
          panNo: data.panNo || ''
        });
      } catch (error) {
        toast.error("Could not load current profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare payload: if password is empty, omit it or send null so backend doesn't overwrite with blank
      const payload = { ...formData };
      if (!payload.password || payload.password.trim() === '') {
        delete payload.password; // or set to null depending on your backend DTO rules
      }

      await updateVendorProfile(payload);

      toast.success('Profile updated successfully!', {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate('/vendor/profile');
      }, 1800);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    }
  };

  if (loading) {
    return <div className="text-center py-5 fw-bold">Loading form...</div>;
  }

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <ToastContainer />

      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          
          <div className="card border-0 shadow-sm p-4 p-md-5 bg-white">
            <div className="pb-4 mb-4 border-bottom">
              <h2 className="fw-bold text-dark mb-1">Modify Profile Details</h2>
              <p className="text-muted m-0 small">Edit your information below and save changes.</p>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">Phone Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="phoneNo" 
                  value={formData.phoneNo} 
                  onChange={handleChange} 
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
                  placeholder="Leave blank to keep old password" 
                  value={formData.password} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold text-secondary small">Legal Business Name</label>
                <input 
                  type="text" 
                  className="form-control fw-semibold" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">GSTIN / Tax Registration</label>
                <input 
                  type="text" 
                  className="form-control font-monospace" 
                  name="gstNo" 
                  value={formData.gstNo} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small">PAN Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="panNo" 
                  value={formData.panNo} 
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