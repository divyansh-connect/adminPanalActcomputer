import React from "react";

const StdDetailsEditSkeleton = () => {
  return (
    <div className="container " aria-hidden="true">
      <div className="placeholder-glow">
        <span className="placeholder py-4 col-12 my-3  rounded">
          <br />
        </span>
      </div>
      <div className="card container">
        <div className="row d-flex placeholder-wave m-1 ">
          <div className="p-2 ps-0 col-12 col-lg-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="placeholder rounded w-100 py-5 my-1 "
              ></div>
            ))}
          </div>
          <div className="p-2 ps-0 col-12 col-lg-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="placeholder rounded w-100 py-5 my-1 "
              ></div>
            ))}
          </div>
        </div>
        <div className="placeholder-glow text-end">
          <span className="placeholder py-4 col-3 mb-3 rounded"></span>
        </div>
      </div>
    </div>
  );
};

export default StdDetailsEditSkeleton;
