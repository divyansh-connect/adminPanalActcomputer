import React, { useEffect, useState } from "react";
import { getDashboardPayment } from "../../../Services/dashboard";

const DashboardLeftUp = ({ setThisMonth }) => {
  const [data, setData] = useState({
    currentMonth: "--",
    lastMonth: "--",
    yearlyTotal: "--",
  });

  useEffect(() => {
    getDashboardPayment()
      .then((response) => {
        if (!response.success) return;

        setThisMonth(response.data.thisMonth);
        setData({
          currentMonth: response.data.thisMonth,
          lastMonth: response.data.lastMonth,
          yearlyTotal: response.data.thisYear,
        });
      })
      .catch((error) => {
        if (error.message === "Unauthorized") return;
      });
  }, []);

  return (
    <div className="row g-4 m-auto pb-3">
      {/* This Month */}
      <div className="col-12 ">
        <div className="card dashboardR5ThisMonth shadow-lg border-0 rounded-4 ">
          <div className="card-body text-center">
            <h6 className="opacity-75">This Month</h6>
            <h2 className="fw-bold">₹{data.currentMonth}</h2>
          </div>
        </div>
      </div>

      {/* Last Month */}
      <div className="col-12 ">
        <div className="card dashboardR5LastMonth shadow-lg border-0 rounded-4 ">
          <div className="card-body text-center">
            <h6 className="opacity-75 text-dark">Last Month</h6>
            <h2 className="fw-bold text-dark">₹{data.lastMonth}</h2>
          </div>
        </div>
      </div>

      {/* Year Total */}
      <div className="col-12 ">
        <div className="card dashboardR5Year shadow-lg border-0 rounded-4 ">
          <div className="card-body text-center">
            <h6 className="opacity-75">Year Total</h6>
            <h2 className="fw-bold">₹{data.yearlyTotal}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLeftUp;
