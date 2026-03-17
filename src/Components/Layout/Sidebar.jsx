import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  const linkClass = "nav-link rounded-start";
  return (
    <div className="sidebar-content text-white d-flex flex-column h-100">
      {/* Mobile Close */}
      <div className="d-md-none text-end p-2">
        <button className="btn btn-sm btn-light" onClick={closeSidebar}>
          ✕
        </button>
      </div>

      {/* Logo / Title */}
      <div className="p-3 text-center border-bottom border-light border-opacity-25">
        <h4 className="fw-bold">Admin Panel</h4>
      </div>

      {/* Navigation */}
      <ul className="nav flex-column p-3 pe-0 gap-2">
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-light text-dark " : "text-light"}`
            }
            onClick={closeSidebar}
          >
            📊 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="library"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-light text-dark " : "text-light"}`
            }
            onClick={closeSidebar}
          >
            📚 Library
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admissions"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-light text-dark " : "text-light"}`
            }
            onClick={closeSidebar}
          >
            📝 New Admission
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-light text-dark " : "text-light"}`
            }
            onClick={closeSidebar}
          >
            👨‍🎓 Students
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/studymaterials"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-light text-dark " : "text-light"}`
            }
            onClick={closeSidebar}
          >
            📂 Study Materials
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/announcements"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-light text-dark " : "text-light"}`
            }
            onClick={closeSidebar}
          >
            📢 Announcements
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
