import React from "react";

const AnnouncementsSkeleton = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <p className="placeholder-glow">
          <span className="placeholder col-4 rounded-3 p-3"></span>
        </p>
        <div className="row g-3">
          {/* Announcement Card */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="placeholder-glow col-md-6 col-lg-4">
              <div className="placeholder rounded p-5 w-100">
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsSkeleton;
