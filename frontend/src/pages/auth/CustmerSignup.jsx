import React from 'react'
import { useNavigate } from "react-router";
import { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerSignup = () => {
   const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const signupHandler =(e)=>{
    e.preventDefault();
     const user = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
    phone: e.target.phone.value,
    address: e.target.address.value,
  };

  localStorage.setItem("user", JSON.stringify(user));
    toast.success("Signup Successful");
     setTimeout(() => {
    navigate("/auth/customer/login");
  }, 2000);
  }
  return (
     <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      // style={{
      //   background: "linear-gradient(135deg, #36d1dc, #5b86e5)"
      // }}
    >
      <div className="card shadow p-4" style={{ width: "650px" }}>
        <h1 className="text-center mb-4"> Customer SignUp</h1>

        <form onSubmit={signupHandler}>
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
              />
            </div>
          </div>

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
              />
            </div>
          </div>

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
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 col-form-label fw-bold">
              Phone
            </label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                name="phone"
              />
            </div>
          </div>

          <div className="row mb-4">
            <label className="col-md-3 col-form-label fw-bold">
              Address
            </label>
            <div className="col-md-9">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Address"
                name="address"
              ></textarea>
            </div>
          </div>

          <div className="d-flex justify-content-around">
            <button type="submit" className="btn btn-success" >
              SignUp
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/auth/customer/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerSignup