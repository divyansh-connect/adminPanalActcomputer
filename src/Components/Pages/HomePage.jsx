import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../../utils/authRole";

const HomePage = () => {
  const navigate = useNavigate();
  const user = getUserRole();
  const cards = [
    {
      title: "Library Students",
      desc: "Manage library student list",
      icon: "📚",
      path: "/library",
      color: "info",
      roles: ["head", "admin"],
    },
    {
      title: "Add Library Student",
      desc: "Register new library student",
      icon: "➕",
      path: "/library/seats",
      color: "warning",
      roles: ["head", "admin"],
    },
    {
      title: "Announcements",
      desc: "Post updates",
      icon: "📢",
      path: "/announcements",
      color: "danger",
      roles: ["head", "admin", "staff"],
    },
    {
      title: "Add Student",
      desc: "Add new course student",
      icon: "📝",
      path: "/admissions",
      color: "primary",
      roles: ["head", "admin", "staff"],
    },
    {
      title: "Students",
      desc: "View all course students",
      icon: "👨‍🎓",
      path: "/students",
      color: "success",
      roles: ["head", "admin", "staff"],
    },
    {
      title: "Study Materials",
      desc: "Upload & manage materials",
      icon: "📂",
      path: "/studymaterials",
      color: "secondary",
      roles: ["head", "admin", "staff"],
    },
  ];
  return (
    <div className="container py-4 h-100 d-flex flex-column">
      {/* 🔥 Welcome Section */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Welcome to Admin Panel</h2>
        <p className="text-muted">
          Manage your institute efficiently from one place
        </p>
      </div>

      {/* 🚀 Cards Section */}
      <div className="row g-4">
        {cards
          .filter((card) => card.roles.includes(user?.role))
          .map((card, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 homeCard">
              <div
                className={`card shadow-sm border-0 h-100`}
                style={{ cursor: "pointer", borderRadius: "12px" }}
                onClick={() => navigate(card.path)}
              >
                <div className="card-body text-center">
                  <div className={`fs-1 rounded-top bg-${card.color}`}>
                    {card.icon}
                  </div>
                  <div className="rounded-bottom bg-secondary-subtle py-4">
                    <h5 className="fw-semibold">{card.title}</h5>
                    <p className="text-muted small">{card.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* 📊 Footer Info */}
      <div className="text-center mt-auto py-3 text-muted small">
        © {new Date().getFullYear()} Act Computer Institute
      </div>
    </div>
  );
};

export default HomePage;
