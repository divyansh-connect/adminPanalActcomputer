import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      {/* Toggle Button (Mobile Only) */}
      <button
        className="btn btn-sm btn-outline-dark d-md-none me-3"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <span className="navbar-brand mb-0 h5">Dashboard</span>

      <div>
        <span className="me-3">Admin</span>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
