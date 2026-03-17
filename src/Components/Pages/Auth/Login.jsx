import React from "react";
import { useState } from "react";
import { postAuthLogin } from "../../../Services/AuthServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disErr, setDisErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLogging(true);
    const payload = { userName: username, userPassword: password };
    try {
      const response = await postAuthLogin(payload);
      if (!response.token) {
        throw new Error("Token not received");
      }
      localStorage.setItem("token", response.token);
      navigate("/", { replace: true });
    } catch (error) {
      setErrMsg(error.message);
      setDisErr(true);
      setIsLogging(false);
    }
  };

  return (
    <div className="container-fluid vh-100 p-0 d-flex flex-column">
      {/* 🔵 MOBILE HEADER */}
      <div
        className="d-md-none text-center mt-1 py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #0a58ca)",
        }}
      >
        <h5 className="mb-0 fw-bold">Act Computer Institute</h5>
        <p className="small mb-0">Admin Panel</p>
      </div>

      <div className="row flex-grow-1  m-0">
        {/* 🔵 LEFT SIDE (DESKTOP ONLY) */}
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white"
          style={{
            background: "linear-gradient(135deg, #0d6efd, #0a58ca)",
          }}
        >
          <h1 className="fw-bold">Act Computer Institute</h1>
          <p className="mt-3 text-center px-4">
            Manage students, Manage Library students, seats and fees efficiently
            with our smart admin panel.
          </p>
        </div>

        {/* 🟢 RIGHT SIDE LOGIN */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-light">
          <div
            className="card shadow-lg border-0 p-4"
            style={{
              width: "100%",
              maxWidth: "380px",
              borderRadius: "16px",
            }}
          >
            {/* Heading */}
            <h3 className="text-center fw-bold mb-2">Admin Login</h3>
            <p className="text-center text-muted small mb-4">
              Welcome back! Please login to continue
            </p>

            {/* Error */}
            {disErr && (
              <div className="alert alert-danger py-2 text-center small">
                {errMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">UserID</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Enter email"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label small fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="btn w-100 d-flex justify-content-center align-items-center"
                disabled={isLogging}
                style={{
                  background: "#0d6efd",
                  color: "#fff",
                  borderRadius: "10px",
                  height: "42px",
                  fontWeight: "500",
                }}
              >
                {isLogging ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-muted small mt-4 mb-0">
              © {new Date().getFullYear()} Act Computer Institute
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
