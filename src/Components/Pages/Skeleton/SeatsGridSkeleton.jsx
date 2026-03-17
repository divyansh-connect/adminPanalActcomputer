import React from "react";

const SeatsGridSkeleton = () => {
  return (
    <>
      {Array.from({ length: 30 }).map((_, index) => (
        <div key={index} className="col-3 col-sm-2 col-md-2 col-lg-2">
          <div className="seat-skeleton"></div>
        </div>
      ))}
    </>
  );
};

export default SeatsGridSkeleton;
