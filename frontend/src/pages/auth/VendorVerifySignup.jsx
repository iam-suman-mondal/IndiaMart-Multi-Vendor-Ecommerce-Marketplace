import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { verifyVendorSignup } from "../../apis/services/user-service";


const VendorVerifySignup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Email passed from Signup page
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const verifyHandlers = async (e) => {
    e.preventDefault();

    try {
          console.log(email);
      console.log(otp);
       const response = await verifyVendorSignup({
      email,
      otp,
    });
 console.log(response );
    //   toast.success(response.data);
 toast.success(response.message || "Verification Successful");
      // Redirect to login page
      navigate("/auth/vendor/login");

    } catch (error) {
      toast.error(error.response?.data || "OTP Verification Failed");
      console.log(error);
  console.log(error.response);
  console.log(error.response?.status);
  console.log(error.response?.data);
    }
  };

  return (
    <div
    className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
    style={{
      minHeight: "100vh",
      backgroundColor: "#1a1a2e",
    }}
    
  >
    <div
      className="row shadow-lg rounded-4 overflow-hidden"
      style={{
        maxWidth: "1000px",
        width: "100%",
        backgroundColor: "#2b2638",
      }}
    >
      {/* Left Side Image */}
      <div className="col-lg-5 p-0">
        <img
          src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=800"
          alt="Verify OTP"
          className="img-fluid h-100 w-100"
          style={{
            objectFit: "cover",
            minHeight: "550px",
          }}
        />
      </div>

      {/* Right Side */}
      <div className="col-lg-7 p-5 text-white d-flex align-items-center">
        <div className="w-100">

          <h2 className="fw-bold mb-2">
            Verify Your Account
          </h2>

          <p className="text-secondary mb-4">
            Enter the OTP sent to your email.
          </p>

          <form onSubmit={verifyHandlers}>

            

            <div className="mb-4">
              <label className="form-label  fw-semibold">
                OTP
              </label>

              <input
                type="text"
            
               className="form-control"
               
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-3 fw-bold"
              style={{
                background: "#8b5cf6",
                color: "white",
                border: "none",
              }}
            >
              Verify OTP
            </button>

            <p className="text-center mt-4 text-secondary">
              Didn't receive the OTP?
              <button
                type="button"
                className="btn btn-link text-info text-decoration-none ms-1 p-0"
              >
                Resend OTP
              </button>
            </p>

          </form>

        </div>
      </div>
    </div>
  </div>
  );
};

export default VendorVerifySignup;