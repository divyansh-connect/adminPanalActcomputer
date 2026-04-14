import React from "react";
import { FaUsers, FaRupeeSign, FaClock } from "react-icons/fa";
import { TbMoneybagMove } from "react-icons/tb";
import DashboardR3Skeleton from "../Skeleton/DashboardR3Skeleton";

const DashboardRightCourse = ({ fetchData, loading }) => {
  const getPercent = (data) => {
    return data.totalFee
      ? Math.round((data.received / data.totalFee) * 100)
      : 0;
  };
  const getColor = (p) => {
    if (p < 40) return "bg-danger";
    if (p < 70) return "bg-warning";
    return "bg-success";
  };
  return (
    <>
      <div className="row mb-3">
        {loading ? (
          <DashboardR3Skeleton />
        ) : (
          <>
            {fetchData?.map((data, index) => (
              <div key={index} className="col-12 ">
                <div className="card rounded-4 mb-2 shadow ">
                  <div className="card-header bg-primary rounded-top-4 text-white  ">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-0 fw-bold">{data.courseName}</h4>
                      <span className="bagde dashboardR4Remaining fw-semibold rounded-3 px-3">
                        Students {data.totalStudent}
                      </span>
                    </div>
                    <small>{data.courseFullName}</small>
                  </div>

                  <div className="card-body row g-2 ">
                    <div className="col-6 ">
                      <div className="d-flex justify-content-between align-items-center bg-light border rounded-3 px-3 py-2">
                        <div className=" ">
                          <h6>Total Fees</h6>
                          <h5 className="fw-bold text-secondary-emphasis">
                            ₹ {data.totalFee}
                          </h5>
                        </div>
                        <TbMoneybagMove size={24} />
                      </div>
                    </div>

                    <div className="col-6 ">
                      <div className="d-flex justify-content-between align-items-center bg-light border rounded-3 px-3 py-2">
                        <div className=" ">
                          <h6>Students Due Fee</h6>
                          <h5 className="fw-bold text-dark">
                            {data.pendingStudents}
                          </h5>
                        </div>
                        <FaUsers size={22} />
                      </div>
                    </div>

                    <div className="col-6 ">
                      <div className="d-flex justify-content-between align-items-center bg-light border rounded-3 px-3 py-2 ">
                        <div className=" ">
                          <h6>Received Amount</h6>
                          <h5 className="fw-bold text-success">
                            ₹ {data.received}
                          </h5>
                        </div>
                        <FaRupeeSign size={22} />
                      </div>
                    </div>

                    <div className="col-6 ">
                      <div className="d-flex justify-content-between align-items-center rounded-3 px-3 py-2 bg-light border ">
                        <div className="">
                          <h6>Pending Amount</h6>
                          <h5 className="fw-bold text-danger">
                            ₹ {data.pending}
                          </h5>
                        </div>
                        <FaClock size={22} />
                      </div>
                    </div>

                    <div className="col-12 ">
                      <div className="progress" style={{ height: "25px" }}>
                        <div
                          className={`progress-bar ${getColor(getPercent(data))}`}
                          role="progressbar"
                          style={{ width: `${getPercent(data)}%` }}
                          aria-valuenow={getPercent(data)}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {getPercent(data)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default DashboardRightCourse;
