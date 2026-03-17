import React from "react";

const FailedFetch = ({ message = "SomeThings Went Wrong" }) => {
  return (
    <div className="container py-5">
      <div className="card shadow border-0 text-center p-5">
        <div className="fs-1 text-danger mb-3">⚠️</div>

        <h4 className="fw-bold text-danger">{message}</h4>

        <p className="text-muted mt-3">
          Please try again or check your connection.
        </p>
      </div>
    </div>
  );
};

export default FailedFetch;
