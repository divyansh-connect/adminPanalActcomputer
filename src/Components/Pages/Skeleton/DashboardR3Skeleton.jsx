import React from "react";

const DashboardR3Skeleton = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="placeholder-glow ">
          <div className="col-12 placeholder rounded p-5 mb-3">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      ))}
    </>
  );
};

export default DashboardR3Skeleton;
