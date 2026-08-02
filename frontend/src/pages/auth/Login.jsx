import React from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
// import { login } from '../../apis/services/user-service';

import { useDispatch, useSelector } from "react-redux";

import { loginSuccess } from '../../redux/authSlice'; 
import { login } from '../../apis/services/user-service';



const Login = () => {
   const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
  email: "",
  password: "",
});


const handleChange = (e) => {
  const { name, value } = e.target;

  setLoginData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const loginHandler = async () => {
  try {
    // console.log(loginData.email);
        const data = await login(loginData);
        // console.log(data.role);

        dispatch(loginSuccess(data));
        setLoginData({
  email: "",
  password: "",
});
  
// console.log(user);



        if (data.role === "ROLE_ADMIN") {
            navigate("/admin");
        } else if (data.role === "ROLE_VENDOR") {
            navigate("/vendor");
        } else {
            navigate("/");
        }
    } catch (error) {
        // console.log(error);
        toast.error(
      error.response?.data?.message || "Invalid Email or Password"
    );

    }



};
 
 
  return (
    <div
    className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
    // style={{
    //   background:
    //     "linear-gradient(135deg,#6a11cb 0%, #2575fc 50%, #36d1dc 100%)",
    //   padding: "20px",
    // }}
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
          alt="Customer Login"
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
            Welcome Back
          </h2>

          <p className="text-secondary mb-4">
            Login to your  account.
          </p>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
               value={loginData.email}
               onChange={handleChange}
              className="form-control text-white border-secondary"
              style={{ backgroundColor: "#3b3448" }}
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
  value={loginData.password}
  onChange={handleChange}
              className="form-control text-white border-secondary"
              style={{ backgroundColor: "#3b3448" }}
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="button"
            className="btn w-100 py-3 fw-bold mb-3"
            style={{
              background: "#8b5cf6",
              color: "white",
              border: "none",
            }}
            onClick={loginHandler}
          >
            Login
          </button>

          <p className="text-center text-secondary mb-2">
            Don't have an account?
          </p>

          <button
            type="button"
            className="btn btn-outline-light w-100"
            onClick={() => navigate("/auth/customer/signup")}
          >
            Create Customer Account
          </button>
          
           <button
            type="button"
            className="btn btn-outline-light w-100 mt-3"
            onClick={() => navigate("/auth/vendor/signup")}
          >
            Create Vendor Account
          </button>

          <p className="text-center mt-4">
            <button
              type="button"
              className="btn btn-link text-info text-decoration-none" onClick={()=>navigate("/auth/ForgotPassword")}
            >
              Forgot Password?
            </button>
          </p>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;