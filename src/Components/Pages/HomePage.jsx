import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Library Students",
      desc: "Manage library student list",
      icon: "📚",
      path: "/library",
      color: "info",
    },
    {
      title: "Add Library Student",
      desc: "Register new library student",
      icon: "➕",
      path: "/library/seats",
      color: "warning",
    },
    {
      title: "Announcements",
      desc: "Post updates",
      icon: "📢",
      path: "/announcements",
      color: "danger",
    },
    {
      title: "Add Student",
      desc: "Add new course student",
      icon: "📝",
      path: "/admissions",
      color: "primary",
    },
    {
      title: "Students",
      desc: "View all course students",
      icon: "👨‍🎓",
      path: "/students",
      color: "success",
    },
    {
      title: "Study Materials",
      desc: "Upload & manage materials",
      icon: "📂",
      path: "/studymaterials",
      color: "secondary",
    },
  ];
  return (
    <div className="container py-4 h-100">
      {/* 🔥 Welcome Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Welcome to Admin Panel</h2>
        <p className="text-muted">
          Manage your institute efficiently from one place
        </p>
      </div>

      {/* 🚀 Cards Section */}
      <div className="row g-4">
        {cards.map((card, index) => (
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
      <div className="text-center mt-5 py-3 text-muted  small">
        © {new Date().getFullYear()} Act Computer Institute
      </div>
    </div>
  );
};

export default HomePage;
