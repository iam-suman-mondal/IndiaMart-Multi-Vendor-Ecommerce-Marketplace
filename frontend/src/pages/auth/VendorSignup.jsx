import { useNavigate } from "react-router";

function VendorSignup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/auth/vendor/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
    //   style={{
    //     background: "linear-gradient(to right, #4facfe, #00f2fe)",
    //   }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "700px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4">Vendor Sign Up</h2>

        <form onSubmit={handleSignup}>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Name</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Email</label>
            <div className="col-sm-8">
              <input type="email" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Password</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Phone</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Business</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Address</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">GST Number</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-4">
            <label className="col-sm-4 col-form-label">Adhar No.</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-success px-4">
              Sign Up
            </button>

            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={() => navigate("/auth/vendor/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VendorSignup;