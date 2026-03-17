import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state;

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center error-bg">
      <div className="card text-center text-white p-5 error-card shadow-lg border-0">
        <h1 className="display-1 fw-bold error-code">404</h1>

        <h3 className="mb-3 text-danger">Oops! Page Not Found</h3>
        <h3 className="mb-3 text-muted">{message}</h3>
        <p className="mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          className="btn btn-light fw-semibold px-4"
          onClick={() => navigate("/", { replace: true })}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Error404;
