import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiShield, FiEdit2 } from "react-icons/fi";

const Profile = () => {
  // State for editable profile data
  const [profileData, setProfileData] = useState({
    firstName: "Suman",
    lastName: "Mondal",
    email: "admin@careerace.com",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    role: "Super Admin",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <h3 className="lh-1 fw-bold">Admin Profile</h3>
      <p className="text-muted mb-4">
        Manage your personal information and security settings
      </p>

      <div className="row g-4">
        {/* Left Column: Profile Summary Card */}
        <div className="col-12 col-xl-4">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-body p-4 text-center d-flex flex-column align-items-center">
              {/* Profile Avatar with Edit Overlay */}
              <div className="position-relative mb-3 mt-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=random&size=120`}
                  alt="Admin Profile"
                  className="rounded-circle shadow-sm"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <button
                  className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: "35px",
                    height: "35px",
                    transform: "translate(10%, 10%)",
                  }}
                  title="Upload new photo"
                >
                  <FiEdit2 size={14} />
                </button>
              </div>

              {/* Name & Role */}
              <h4 className="fw-bold mb-1">
                {profileData.firstName} {profileData.lastName}
              </h4>
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-4">
                <FiShield className="me-1" /> {profileData.role}
              </span>

              {/* Contact Info List */}
              <div className="w-100 text-start mt-2">
                <h6 className="text-muted text-uppercase small fw-bold mb-3">
                  Contact Details
                </h6>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-light p-2 rounded text-secondary">
                    <FiMail size={18} />
                  </div>
                  <div>
                    <div className="small text-muted mb-0">Email Address</div>
                    <div className="fw-medium">{profileData.email}</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-light p-2 rounded text-secondary">
                    <FiPhone size={18} />
                  </div>
                  <div>
                    <div className="small text-muted mb-0">Phone Number</div>
                    <div className="fw-medium">{profileData.phone}</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="bg-light p-2 rounded text-secondary">
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <div className="small text-muted mb-0">Location</div>
                    <div className="fw-medium">{profileData.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Forms */}
        <div className="col-12 col-xl-8">
          {/* Personal Information Form */}
          <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <h5 className="fw-semibold mb-4">Personal Information</h5>

              <form>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-medium">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-muted small fw-medium">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 mt-4 text-end">
                    <button type="button" className="btn btn-primary px-4">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Change Password Form */}
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-semibold mb-4">Change Password</h5>

              <form>
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label className="form-label text-muted small fw-medium">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label text-muted small fw-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label text-muted small fw-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="col-12 mt-4 text-end">
                    <button
                      type="button"
                      className="btn btn-outline-primary px-4"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
