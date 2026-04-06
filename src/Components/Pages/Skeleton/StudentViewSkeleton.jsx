import React from "react";

const StudentViewSkeleton = () => {
  return (
    <div className="placeholder-glow">
      <span className="placeholder col-12 py-5 rounded my-2"></span>
      <span className="placeholder col-12 py-5 bg-primary rounded my-2"></span>
      <span className="placeholder col-12 py-5 rounded my-2">
        <br />
        <br />
        <br />
        <br />
      </span>
      <span className="placeholder col-12 py-5 bg-info rounded my-2">
        <br />
        <br />
        <br />
        <br />
      </span>
      <span className="placeholder col-12 py-5 rounded my-2">
        <br />
        <br />
        <br />
        <br />
      </span>
    </div>
  );
};

export default StudentViewSkeleton;
