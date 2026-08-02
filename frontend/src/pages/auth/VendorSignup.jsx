import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { vendorSignup } from "../../apis/services/user-service";

// If you have a local image, uncomment this line
// import vendorImage from "../../assets/vendor.png";

const VendorSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    companyName: "",
    address: "",
    gstNo: "",
    panNo: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Signup Handler
  const signupHandler = async(e) => {
    e.preventDefault();
     const {
    name,
    email,
    password,
    phoneNo ,
    companyName,
    address,
    gstNo,
    panNo,
  } = formData;

  if (
    !name ||
    !email ||
    !password ||
    !phoneNo ||
    !companyName ||
    !address ||
    !gstNo ||
    !panNo
  ) {
    toast.error("Please fill all fields");
    return;
  }

    console.log(formData);

    // Call API Here
     try {
        const response = await vendorSignup(formData);

    console.log(response);

    toast.success(response.message || "OTP sent successfully");

    navigate("/auth/vendor/verifysignup", {
      state: {
        email: formData.email,
      },
    });
    
      } catch (error) {
        // alert(error.response?.data);
        console.log(error);
  console.log(error.response);
  console.log(error.response?.status);
  console.log(error.response?.data);
      }

    
  };


  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a2e",
      }}
    >
      <div
        className="row shadow-lg rounded-4 overflow-hidden"
        style={{
          width: "1100px",
          maxWidth: "95%",
          backgroundColor: "#2b2638",
        }}
      >
        {/* Left Side Image */}
        <div className="col-md-5 p-0">
          <img
            // src={vendorImage}
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800"
            alt="Vendor Signup"
            className="img-fluid h-100 w-100"
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right Side */}
        <div className="col-md-7 p-5 text-white">
          <h2 className="fw-bold text-center mb-4">
            Vendor Signup
          </h2>

          <form onSubmit={signupHandler}>
            {/* Name */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                Name
              </label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                Email
              </label>

              <div className="col-md-9">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                Password
              </label>

              <div className="col-md-9">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                Phone
              </label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  name="phoneNo"
                  value={formData.phoneNo }
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Business */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                companyName
              </label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Business Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                Address
              </label>

              <div className="col-md-9">
                <textarea
                  rows="3"
                  className="form-control"
                  placeholder="Enter Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* GST Number */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                GST No.
              </label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter GST Number"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Aadhaar Number */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                panNo 
              </label>

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Aadhaar Number"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Signup Button */}
            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-lg"
                style={{
                  background: "#8b5cf6",
                  color: "#fff",
                  border: "none",
                }}
              >
                Sign Up
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center mt-4 mb-0 text-white">
              Already have an account?
              <Link
                to="/auth/vendor/login"
                className="text-decoration-none fw-semibold ms-1"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;