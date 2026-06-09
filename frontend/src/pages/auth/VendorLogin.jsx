import React from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
const VendorLogin = () => {
  const navigate = useNavigate();
  const loginHandler =(e)=>{
    
  
        toast.success("login Successful");
         setTimeout(() => {
        navigate("/vendor");
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
        <h1 className="text-center mb-4">Vendor Login</h1>

          <div className="row mb-3">
            <label className="col-md-3 col-form-label fw-bold">
              Email
            </label>
            <div className="col-md-9">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
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
              />
            </div>
          </div>

          

          
        

          <div className="d-flex justify-content-around">
            <button type="submit" className="btn btn-success" onClick={() => navigate("/auth/vendor/signup")}>
              SignUp
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={loginHandler}
            >
              Login
            </button>
          </div>
      </div>
    </div>
  )
}

export default VendorLogin