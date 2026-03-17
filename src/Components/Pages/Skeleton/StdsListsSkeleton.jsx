import React from "react";

const StdsListsSkeleton = () => {
  return (
    <>
      {/* Desktop Table */}
      <div className="d-none d-md-block">
        <div className="card shadow-sm">
          <div className="card-body table-responsive">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="m-1 mb-2">
                <div className="seat-skeleton"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="d-md-none">
        {Array.from({ length: 6 }).map((_, indx) => {
          return (
            <div key={indx} className="card shadow-sm mb-3 ">
              <div className="card-body ">
                <div className="mb-2 seat-skeleton"></div>
                <div className="mb-2 seat-skeleton"></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default StdsListsSkeleton;
