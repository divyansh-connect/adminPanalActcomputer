import React from "react";

const StudentDetailsSkeleton = () => {
  return (
    <div className="container mt-3" aria-hidden="true">
      <div>
        <div>
          <span className="placeholder col-12 my-3  rounded">
            <br />
            <br />
          </span>
        </div>
        <div className="card container">
          <div className="row d-flex placeholder-glow m-1 ">
            <div className="p-2 ps-0 col-12 col-lg-6">
              <div className="placeholder rounded w-100 ">
                {Array.from({ length: 10 }).map((_, index) => (
                  <br key={index} />
                ))}
              </div>
            </div>
            <div className="p-2 pe-0 col-12 col-lg-6">
              <div className="placeholder rounded w-100 ">
                {Array.from({ length: 10 }).map((_, index) => (
                  <br key={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="m-1 row placeholder-glow">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="col-12 py-2 m-1 placeholder rounded">
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsSkeleton;
