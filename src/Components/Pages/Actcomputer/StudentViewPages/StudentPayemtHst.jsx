import React from "react";

const StudentPayemtHst = ({ stdPayments }) => {
  const payments = stdPayments;

  return (
    <div className="container-fluid mb-3 px-0">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h6 className="fw-bold mb-3">Payment History</h6>

          {/* Header */}
          <div className="row fw-bold border-bottom pb-2 mb-2 d-none d-md-flex">
            <div className="col-md-3">Amount</div>
            <div className="col-md-3">Date</div>
            <div className="col-md-3">Method</div>
            <div className="col-md-3">Fee Type</div>
          </div>

          {/* Data */}
          {payments.length > 0 ? (
            payments.map((p) => (
              <div
                key={p._id}
                className="row align-items-center border-bottom py-2"
              >
                {/* Amount */}
                <div className="col-6 col-md-3 fw-semibold">
                  <span className="d-md-none fw-semibold">Amount: </span>₹{" "}
                  {p.amount}
                </div>

                {/* Date */}
                <div className="col-6 col-md-3 small">
                  <span className="d-md-none fw-semibold">Date: </span>
                  {new Date(p.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                {/* Method */}
                <div className="col-6 col-md-3 small">
                  <span className="d-md-none fw-semibold">Method: </span>
                  {p.paymentMethod}
                </div>

                {/* Fee Type */}
                <div className="col-6 col-md-3 small">
                  <span className="d-md-none fw-semibold">Fee Type: </span>
                  {p.feeType === "other" ? p.note : p.feeType}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted py-5">
              This student hasn’t made any payments yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPayemtHst;
