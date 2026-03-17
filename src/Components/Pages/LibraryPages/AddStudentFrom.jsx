import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import AddStudentCancel from "../Modal/ModalLibraryStudent/AddStudentCancel";
import { postAddStudentLibrary } from "../../../Services/LibraryServices";
import FailedFetch from "../Error/FailedFetch";

const AddStudentFrom = () => {
  const { id, seatNo } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [valueError, setValueError] = useState({
    fullName: "",
    phoneNum: "",
    gender: "",
    joinDate: "",
    amount: "",
    paymentStatus: "",
  });

  const fullName = useRef();
  const phoneNum = useRef();
  const gender = useRef();
  const member = useRef();
  const joinDate = useRef();
  const amount = useRef();
  const stdId = id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stdName = fullName.current.value.trim();
    const stdPhone = phoneNum.current.value.trim();
    const stdJoin = joinDate.current.value;
    const stdGender = gender.current.value;
    const stdAmount = amount.current.value;
    const stdMember = member.current.value;
    let newErrors = {};

    if (!stdName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!/^\d{10}$/.test(stdPhone)) {
      newErrors.phoneNum = "Phone must be 10 digits";
    }
    if (!stdJoin) {
      newErrors.joinDate = "Join Date is required";
    }
    if (stdGender === "Select Gender") {
      newErrors.gender = "Select gender";
    }
    if (stdAmount === "Select Amount") {
      newErrors.amount = "Select Amount";
    }
    if (stdMember === "Membership Status") {
      newErrors.membershipStatus = "Select membership status";
    }
    setValueError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      //   API Calls
      const addStd = {
        stdId,
        stdName,
        stdPhone,
        stdJoin,
        stdGender,
        stdMember,
        stdAmount,
      };

      const response = await postAddStudentLibrary(addStd);

      if (response.success) {
        navigate("/library", { replace: true });
      } else {
        navigate("/error", { replace: true, state: response.message });
      }
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="text-center mb-4">
              Add Student -{" "}
              <span className="text-danger">Seat No: {seatNo}</span>
            </h4>

            <form onSubmit={handleSubmit}>
              {/* Personal Info */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text">👤</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full name"
                      ref={fullName}
                      required
                    />
                  </div>
                  {valueError.fullName && (
                    <div className="text-danger small">
                      {valueError.fullName}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text">📱</span>
                    <input
                      type="tel"
                      maxLength="10"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      ref={phoneNum}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                      required
                    />
                  </div>
                  {valueError.phoneNum && (
                    <div className="text-danger small">
                      {valueError.phoneNum}
                    </div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Gender</label>
                  <div className="input-group">
                    <span className="input-group-text">⚧</span>
                    <select className="form-select" ref={gender} required>
                      <option>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  {valueError.gender && (
                    <div className="text-danger small">{valueError.gender}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Join Date</label>
                  <div className="input-group">
                    <span className="input-group-text">📅</span>
                    <input
                      type="date"
                      className="form-control"
                      ref={joinDate}
                      required
                    />
                  </div>
                  {valueError.joinDate && (
                    <div className="text-danger small">
                      {valueError.joinDate}
                    </div>
                  )}
                </div>
              </div>

              {/* Membership Info */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Amount</label>
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <select className="form-select" ref={amount} required>
                      <option>Select Amount</option>
                      <option>600</option>
                      <option>1500</option>
                      <option>Pending</option>
                    </select>
                  </div>
                  {valueError.amount && (
                    <div className="text-danger small">{valueError.amount}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Membership Status</label>
                  <div className="input-group">
                    <span className="input-group-text">💳</span>
                    <select className="form-select" ref={member} required>
                      <option>Membership Status</option>
                      <option>1 Month Paid</option>
                      <option>3 Month Paid</option>
                    </select>
                  </div>
                  {valueError.membershipStatus && (
                    <div className="text-danger small">
                      {valueError.membershipStatus}
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary px-4 me-3">
                  Add Student
                </button>
                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={() => setShowModal(true)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && <AddStudentCancel setShowModal={setShowModal} />}
    </>
  );
};

export default AddStudentFrom;
