import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { payStdFee } from "../../../Services/InstitudeServices";

const StudentPayFee = ({ setPayFee, student, setFeeRecipt }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [feeType, setFeeType] = useState("");
  const [method, setMethod] = useState("");
  const [customFee, setCustomFee] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [valueError, setValueError] = useState({});

  const handlePayfee = async (e, id) => {
    e.preventDefault();
    setIsSaving(true);
    const err = {};
    if (!amount) {
      err.amount = "Enter amount";
    }
    if (!feeType) {
      err.feeType = "Enter fee type";
    }
    if (feeType === "other" && !customFee) {
      err.customFee = "Enter fee title";
    }
    if (!method) {
      err.method = "Select payment method";
    }
    setValueError(err);
    if (Object.keys(err).length > 0) {
      return setIsSaving(false);
    }
    const payload = {
      studentId: id,
      feeType,
      amount: Number(amount),
      method,
    };
    if (feeType === "other") {
      payload.note = customFee;
    }
    try {
      const response = await payStdFee(payload);
      if (!response.success) {
        setValueError({ errPay: response.message || "Payment Failed" });
      }
      setPayFee(false);
      setFeeRecipt({
        success: response.success,
        data: response.data,
      });
    } catch (error) {
      if (error.message === "Unauthorized") return;
      setValueError({ errPay: error.message || "Server Failed" });
    }
  };
  return (
    <>
      <div className="overlay"></div>
      <div
        className="modal fade show ms-md-5"
        id="exampleModalCenteredScrollable"
        tabIndex="-1"
        aria-labelledby="institudeStudentFeeModal"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="institudeStudentFeeModal">
                Pay Fee
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setPayFee(false);
                }}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {valueError.errPay && (
                <div className="ms-2 text-danger text-center">
                  {valueError.errPay}
                </div>
              )}

              {/* Student Info */}
              <div className="mb-3">
                <div className="fw-semibold">{student.stdName}</div>
                <div className="text-muted small">
                  {student.courseId.courseName} (
                  {student.courseId.courseFullName})
                </div>
              </div>

              {/* Fee Summary */}
              <div className="border rounded p-2 mb-3 small">
                <div className="d-flex justify-content-between">
                  <span>Total Fee</span>
                  <span>₹ student totalFee</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Paid</span>
                  <span>₹ student paidFee</span>
                </div>

                <div className="d-flex justify-content-between fw-semibold text-danger">
                  <span>Remaining</span>
                  <span>₹ remaining </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={(e) => handlePayfee(e, student._id)}>
                {/* Fee Type */}
                <div className="mb-3">
                  <label className="form-label">Fee Type*</label>
                  {valueError.feeType && (
                    <span className="ms-2 text-danger small">
                      {valueError.feeType}
                    </span>
                  )}
                  <select
                    className="form-select"
                    value={feeType}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFeeType(value);
                      setShowCustom(value === "other");
                    }}
                  >
                    <option value="">Select Fee Type</option>
                    <option value="admission">Admission Fee</option>
                    <option value="enrollment">Enrollment Fee</option>
                    <option value="exam1">Examination Fee (1st Sem)</option>
                    <option value="exam2">Examination Fee (2nd Sem)</option>
                    <option value="monthly">Monthly Fee</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {showCustom && (
                  <div className="mb-3">
                    <label className="form-label">Fee Title*</label>
                    {valueError.customFee && (
                      <span className="ms-2 text-danger small">
                        {valueError.customFee}
                      </span>
                    )}

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter custom fee title (e.g.  Fine)"
                      value={customFee}
                      onChange={(e) => setCustomFee(e.target.value)}
                    />
                  </div>
                )}

                {/* Note */}

                {/* Amount */}
                <div className="mb-3">
                  <label className="form-label">Amount* </label>
                  {valueError.amount && (
                    <span className="ms-2 text-danger small">
                      {valueError.amount}
                    </span>
                  )}
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  {valueError.method && (
                    <span className="ms-2 text-danger small">
                      {valueError.method}
                    </span>
                  )}
                  <select
                    className="form-select"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <option value="">Select Payment Type</option>
                    <option>Cash</option>
                    <option>UPI</option>
                  </select>
                </div>

                {/* Footer Buttons */}
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setPayFee(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-primary">
                    Pay Fee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPayFee;
