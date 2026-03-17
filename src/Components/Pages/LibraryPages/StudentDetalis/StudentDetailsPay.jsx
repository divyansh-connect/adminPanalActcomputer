import React from "react";
import { useState } from "react";
import { useRef } from "react";
import {
  getStudent,
  putStudentPay,
} from "../../../../Services/LibraryServices";
import { useNavigate } from "react-router-dom";

const StudentDetailsPay = ({ student, setStudent, setShowPayModal }) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [valueError, setValueError] = useState({
    amount: "",
    paymentStatus: "",
  });
  const amount = useRef();
  const member = useRef();

  const handleSubmit = async () => {
    setSaving(true);
    const stdAmount = amount.current.value;
    const stdMember = member.current.value;

    let newErrors = {};

    if (stdAmount === "Amount") {
      newErrors.amount = "Select Amount";
    }
    if (stdMember === "Membership") {
      newErrors.membershipStatus = "Select membership status";
    }

    setValueError(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    try {
      const stdData = { stdAmount, stdMember };
      const response = await putStudentPay(student.id, stdData);
      if (!response.success) {
        return navigate("/error", { replace: true, state: response.message });
      }
      const payFee = await getStudent(student.id);
      setStudent(payFee);
      setShowPayModal(false);
      setSaving(false);
    } catch (err) {
      return new Error("Unable To Fatch");
    }
  };

  return (
    <>
      <div className="overlay"></div>
      <div
        className="modal fade show ms-md-5"
        id="exampleModalCenteredScrollable"
        tabIndex="-1"
        aria-labelledby="exampleModalCenteredScrollableTitle"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalCenteredScrollableTitle"
              >
                Completed Payment
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setShowPayModal(false);
                }}
              ></button>
            </div>

            <div className="modal-body ">
              <p className="mb-3">
                <b className="pe-2">Student:</b> {student.name}
              </p>
              <p className="mb-3">
                <b className="pe-2">Seat:</b> {student.seat}
              </p>

              <form>
                <div className="mb-3">
                  <label className="col-form-label">
                    <b>Membership</b>
                  </label>
                  <select className="form-select" ref={member}>
                    <option>Membership</option>
                    <option>1 Month</option>
                    <option>3 Month</option>
                  </select>
                  {valueError.membershipStatus && (
                    <div className="text-danger small">
                      {valueError.membershipStatus}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="col-form-label">
                    <b>Amount</b>
                  </label>
                  <select className="form-select" ref={amount}>
                    <option>Amount</option>
                    <option>600</option>
                    <option>1500</option>
                  </select>
                  {valueError.amount && (
                    <div className="text-danger small">{valueError.amount}</div>
                  )}
                </div>
              </form>

              <br />
              <br />
            </div>

            <div className="modal-footer">
              {saving ? (
                <>
                  <button className="btn btn-primary" disabled>
                    Saving......
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setShowPayModal(false);
                    }}
                  >
                    Close
                  </button>

                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Save changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetailsPay;
