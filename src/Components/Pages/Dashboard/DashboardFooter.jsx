import React from "react";

const DashboardFooter = () => {
  return (
    <footer className="bg-body-tertiary text-dark py-2">
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center">
          {/* Left */}
          <p className="mb-2 ">Act Computer & Library</p>
          <div className="d-flex gap-3">
            <p className="text-dark text-decoration-none small">Privacy</p>
            <p className="text-dark text-decoration-none small">Terms</p>
            <p className="text-dark text-decoration-none small">Support</p>
          </div>

          {/* Right */}
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
