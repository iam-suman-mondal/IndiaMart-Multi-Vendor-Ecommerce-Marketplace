import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetPassword = async () => {
    if (!formData.otp) {
      toast.error("Enter OTP");
      return;
    }

    if (!formData.newPassword) {
      toast.error("Enter new password");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
        const response = await resetPassword({
      email,
      otp: formData.otp,
      newPassword: formData.newPassword,
    });

    toast.success(response.message || "Password reset successfully");
      

    

      setTimeout(() => {
        navigate("/auth/customer/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data || "Password reset failed"
      );
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
    //   style={{
    //     background:
    //       "linear-gradient(135deg,#6a11cb 0%, #2575fc 50%, #36d1dc 100%)",
    //     padding: "20px",
    //   }}
    style={{
      minHeight: "100vh",
      backgroundColor: "#1a1a2e",
    }}
    >
      <div
        className="row shadow-lg rounded-4 overflow-hidden"
        style={{
          maxWidth: "1050px",
          width: "100%",
          backgroundColor: "#2b2638",
        }}
      >
        {/* Left Image */}
        <div className="col-lg-5 p-0">
          <img
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900"
            alt="Reset Password"
            className="img-fluid h-100 w-100"
            style={{
              objectFit: "cover",
              minHeight: "650px",
            }}
          />
        </div>

        {/* Right Form */}
        <div className="col-lg-7 p-5 text-white d-flex align-items-center">
          <div className="w-100">

            <h2 className="fw-bold mb-2">
              Reset Password
            </h2>

            <p className="text-secondary mb-4">
              Verify your OTP and create a new password.
            </p>

            {/* <div className="mb-3">
              <label className="form-label fw-semibold">
                Email
              </label>

              <input
                type="email"
                className="form-control text-white border-secondary"
                style={{ backgroundColor: "#3b3448" }}
                value={email}
                disabled
              />
            </div> */}

            <div className="mb-3">
              <label className="form-label fw-semibold">
                OTP
              </label>

              <input
                type="text"
                name="otp"
                className="form-control text-white border-secondary"
                style={{ backgroundColor: "#3b3448" }}
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                className="form-control text-white border-secondary"
                style={{ backgroundColor: "#3b3448" }}
                placeholder="Enter New Password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                className="form-control text-white border-secondary"
                style={{ backgroundColor: "#3b3448" }}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn w-100 py-3 fw-bold mb-3"
              style={{
                background: "#8b5cf6",
                color: "#fff",
                border: "none",
              }}
              onClick={resetPassword}
            >
              Reset Password
            </button>

            <button
              className="btn btn-outline-light w-100"
              onClick={() => navigate("/auth/customer/login")}
            >
              Back to Login
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;