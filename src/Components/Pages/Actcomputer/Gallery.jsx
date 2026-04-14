import React from "react";

const Gallery = () => {
  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card shadow border-0 text-center p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        {/* Heading */}
        <h2 className="fw-bold mb-3">Welcome to Gallery 👋</h2>

        {/* Message */}
        <p className="text-muted mb-4">
          This section is currently under development.
        </p>

        {/* Alert Box */}
        <div className="alert alert-warning mb-0" role="alert">
          🚧 Work is currently in progress. Please wait for a while.
        </div>
      </div>
    </div>
  );
};

export default Gallery;
