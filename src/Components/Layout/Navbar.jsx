import { jwtDecode } from "jwt-decode";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

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
      <div className="py-0">
        <NavLink to="/" className="navbar-brand mb-0 h5 text-end">
          <h4 className="fw-semibold m-0">Dashboard</h4>
        </NavLink>
        <strong className="text-danger small  d-md-none">
          {new Date().toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </strong>
      </div>
      <div className="d-none d-md-block">
        <div className="d-flex gap-3 justify-content-e">
          <div className="d-flex flex-column small ">
            <strong className="rounded px-2 text-bg-info ms-auto ">
              {user.firstName}
            </strong>
            <span className="text-dark">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <button
            className="btn btn-sm btn-outline-danger "
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
