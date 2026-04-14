import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="h-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="text-center p-4 shadow rounded bg-white"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <div className="mb-3">
          <span className="display-1 text-danger">403</span>
        </div>

        <h4 className="fw-semibold">Access Denied</h4>

        <p className="text-muted mb-4">
          You don’t have permission to view this page.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-primary px-4"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
