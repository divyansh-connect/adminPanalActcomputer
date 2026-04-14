import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { routesConfig } from "../../Routes/routesConfig";
import { getUserRole } from "../../utils/authRole";

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const user = getUserRole();

  const linkClass = "nav-link rounded-start";
  return (
    <>
      <div className="sidebar-content text-white d-flex flex-column h-100">
        {/* Mobile Close */}
        <div className="d-md-none text-end p-2">
          <button className="btn btn-sm btn-light" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        {/* Logo / Title */}
        <div className="p-3 text-center border-bottom border-light border-opacity-25">
          <h4 className="fw-bold m-0">Admin Panel</h4>
        </div>

        {/* Navigation */}
        <ul className="nav flex-column p-3 pe-0 gap-2">
          {routesConfig
            .filter((route) => route.name)
            .map((sidebar) => {
              if (!sidebar.roles.includes(user?.role)) return null;
              return (
                <li key={sidebar.path}>
                  <NavLink
                    to={sidebar.path}
                    className={({ isActive }) =>
                      `${linkClass} ${isActive ? "bg-light text-dark " : "text-light"}`
                    }
                    onClick={closeSidebar}
                  >
                    {sidebar.name}
                  </NavLink>
                </li>
              );
            })}
        </ul>

        <ul className="nav d-block d-md-none mt-auto mb-5 px-3 pb-3">
          <li>
            <button
              className="btn w-100 text-start d-flex align-items-center gap-2 rounded-3"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
              }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth/login");
              }}
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
