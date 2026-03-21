import React from "react";

const StudentFeeSummary = ({ stdCourse, stdPayments }) => {
  const totalFees = stdCourse.courseTotalFees;
  const totalPaid = stdPayments.reduce((acc, p) => {
    return (acc += p?.amount);
  }, 0);
  const lastPaymentDate = stdPayments[0]?.createdAt;
  const remaining = totalFees - totalPaid;

  return (
    <>
      <div className="container-fluid mb-3 px-0">
        <div className="row g-3">
          {/* Total Fees */}
          <div className="col-6 col-md-3 feeCard">
            <div className="card shadow-sm border-0 h-100 bg-primary-subtle text-primary total-Fee ">
              <div className="card-body border-start border-4 border-primary">
                <h6 className="text-muted">Total Fees</h6>
                <h5 className="fw-bold">₹ {totalFees}</h5>
              </div>
            </div>
          </div>

          {/* Paid */}
          <div className="col-6 col-md-3 feeCard">
            <div className="card shadow-sm border-0 h-100 bg-success-subtle text-success">
              <div className="card-body border-start border-4 border-success">
                <h6 className="text-muted">Paid</h6>
                <h5 className="fw-bold text-success">₹ {totalPaid}</h5>
              </div>
            </div>
          </div>

          {/* Remaining */}
          <div className="col-6 col-md-3 feeCard">
            <div className="card shadow-sm border-0 h-100 bg-danger-subtle text-danger">
              <div className="card-body border-start border-4 border-danger">
                <h6 className="text-muted">Remaining</h6>
                <h5 className="fw-bold text-danger">₹ {remaining}</h5>
              </div>
            </div>
          </div>

          {/* Last Payment */}
          <div className="col-6 col-md-3 feeCard">
            <div className="card shadow-sm border-0 h-100 last-Pay">
              <div
                className="card-body "
                style={{ borderLeft: "4px solid #6f42c1" }}
              >
                <h6 className="text-muted">Last Payment</h6>
                <h6 className="fw-semibold">
                  {lastPaymentDate
                    ? new Date(lastPaymentDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentFeeSummary;
