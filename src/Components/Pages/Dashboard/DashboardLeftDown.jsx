import React, { useEffect, useState } from "react";

const DashboardLeftDown = ({ fetchData }) => {
  const [data, setData] = useState({
    pendingStudents: "--",
    completedStudents: "--",
  });

  useEffect(() => {
    const fetch = fetchData.reduce(
      (sum, fdata) => {
        sum.pendindStd += fdata.pendingStudents || 0;
        sum.stds += fdata.totalStudent || 0;
        return sum;
      },
      {
        pendindStd: 0,
        stds: 0,
      },
    );

    setData({
      pendingStudents: fetch.pendindStd,
      completedStudents: fetch.stds - fetch.pendindStd,
    });
  }, [fetchData]);

  return (
    <div className="row m-auto">
      {/* Pending Students */}
      <div className="col-6 col-md-12 col-lg-6 mb-3">
        <div className="card shadow border-0 text-center">
          <div className="card-body rounded-top dashboardR4Remaining">
            <h6 className="fw-bold">Fees Remaining</h6>
          </div>
          <div className="py-2">
            <h6 className="mb-0 text-muted">Total Students</h6>
            <h3 className="text-primary fw-semibold">
              {data?.pendingStudents}
            </h3>
          </div>
        </div>
      </div>

      {/* Completed Students */}
      <div className="col-6 col-md-12 col-lg-6">
        <div className="card shadow-sm border-0 text-center ">
          <div className="card-body rounded-top dashboardR4Paid">
            <h6 className="fw-bold ">Fees Paid</h6>
          </div>
          <div className="py-2">
            <h6 className="mb-0 text-muted">Total Students</h6>
            <h3 className="text-primary fw-semibold">
              {data?.completedStudents}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLeftDown;
