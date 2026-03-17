import React from "react";

const StudentDetailsPayment = ({ student }) => {
  return (
    <div className="h100">
      {/* Payment History */}
      <h5 className="fw-semibold mb-3">Payment History</h5>

      <div className="table-responsive library-payment">
        <table className="table table-bordered table-sm">
          <thead className="table-light">
            <tr>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Valid Upto</th>
            </tr>
          </thead>
          <tbody>
            {student.stdPaymentHistroy.length > 0 ? (
              student.stdPaymentHistroy.map((payment, index) => {
                const paymentDate =
                  payment.amount !== "pending"
                    ? new Date(payment.paymentDate).toLocaleDateString()
                    : "Awaiting Payment !!";

                const validTill = new Date(
                  payment.validTill,
                ).toLocaleDateString();
                return (
                  <tr key={index}>
                    <td>
                      {payment.amount !== "pending" ? (
                        ("₹", payment.amount)
                      ) : (
                        <span className="badge bg-warning">Pending</span>
                      )}
                    </td>
                    <td>{paymentDate}</td>
                    <td>{validTill}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No Payment Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetailsPayment;
