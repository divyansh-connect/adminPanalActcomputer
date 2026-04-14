import React from "react";
import { FaUsers, FaRupeeSign, FaClock, FaChartLine } from "react-icons/fa";

const DashboardHead = ({ fetchData, thisMonth }) => {
  const data = fetchData.reduce(
    (sum, cdata) => {
      sum.totalStudents += cdata.totalStudent || 0;
      sum.totalRevenue += cdata.totalFee || 0;
      sum.pendingAmount += cdata.pending || 0;
      return sum;
    },
    {
      totalStudents: 0,
      totalRevenue: 0,
      pendingAmount: 0,
      monthlyRevenue: 0,
    },
  );

  return (
    <div className="container mb-3 px-0">
      {/* Heading */}
      <div className="mb-3 ">
        <h2 className="fw-bold text-primary">ACT Computer Institute</h2>
      </div>

      <div className="row g-3">
        {/* Total Students */}
        <div className="col-6 col-lg-3">
          <div className="card shadow-sm border-0 rounded-end-pill bg-primary text-white h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <small>Total Students</small>
                <h4 className="mb-0">{data?.totalStudents}</h4>
              </div>
              <FaUsers size={28} />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="col-6 col-lg-3">
          <div className="card shadow-sm border-0 rounded-end-pill bg-success text-white h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <small>Total Revenue</small>
                <h4 className="mb-0">₹{data?.totalRevenue}</h4>
              </div>
              <FaRupeeSign size={28} />
            </div>
          </div>
        </div>

        {/* Pending Amount */}
        <div className="col-6 col-lg-3">
          <div className="card shadow-sm border-0 rounded-end-pill bg-warning text-dark h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <small>Pending Amount</small>
                <h4 className="mb-0">₹{data?.pendingAmount}</h4>
              </div>
              <FaClock size={28} />
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="col-6 col-lg-3">
          <div className="card shadow-sm border-0 rounded-end-pill bg-danger text-white h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <small>Monthly Revenue</small>
                <h4 className="mb-0">₹{thisMonth}</h4>
              </div>
              <FaChartLine size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHead;
