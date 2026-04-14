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
      <div className="shadow rounded dashboardR4Paid mb-3 p-3 py-5">
        <div className="row  g-4">
          {menuItems.map((item, index) => (
            <div className="col-6 col-md-4 " key={index}>
              <div
                className={`card menu-card bg-${item.color} text-white`}
                onClick={() => navigate(item.path)}
              >
                <div className="card-body text-center">
                  <h5
                    className="fw-bold"
                    style={{ fontSize: "clamp(14px, 2vw, 28px)" }}
                  >
                    {item.title}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardData;
