import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardData = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Study Materials", path: "/studymaterials", color: "primary" },
    { title: "Announcements", path: "/announcements", color: "warning" },
    { title: "Institute Students", path: "/students", color: "info" },
    { title: "Library Students", path: "/library", color: "danger" },
    { title: "Gallery", path: "/gallery", color: "success" },
  ];

  return (
    <>
      <div className="h-100 d-flex flex-column ">
        <div className="shadow rounded dashboardR4Paid mb-3 px-3 pt-4 d-flex flex-column h-100">
          <div className="d-flex justify-content-center align-items-center pb-3 mb-2">
            <h5 className="fw-semibold ">Quick Access</h5>
          </div>

          <div className="row dashboardStaffScroll g-4 h-100 pb-3 flex-grow-1">
            {menuItems.map((item, index) => (
              <div className="col-12 " key={index}>
                <div
                  className={`card menu-card bg-${item.color} text-white`}
                  onClick={() => navigate(item.path)}
                >
                  <div className="card-body text-center">
                    <h5
                      className="fw-bold"
                      style={{ fontSize: "clamp(14px, 2vw, 24px)" }}
                    >
                      {item.title}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardData;
