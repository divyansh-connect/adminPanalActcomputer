import React from "react";
import { useState } from "react";
import { postAuthLogin } from "../../../Services/AuthServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disErr, setDisErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        {disErr && <h4 className="text-danger text-center">{errMsg}</h4>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="input"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
