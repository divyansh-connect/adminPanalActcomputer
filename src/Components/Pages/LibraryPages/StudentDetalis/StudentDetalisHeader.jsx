import React from "react";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import StudentDetailsPay from "./StudentDetailsPay";

const StudentDetalisHeader = ({ student, setStudent }) => {
  const navigate = useNavigate();
  const [showPayModal, setShowPayModal] = useState(false);

  const handleBackBtn = () => {
    navigate("/library");
  };

  const handlePayBtn = () => {
    setShowPayModal(true);
  };
  return (
    <div>
      {showPayModal && (
        <StudentDetailsPay
          student={student}
          setStudent={setStudent}
          setShowPayModal={setShowPayModal}
        />
      )}
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Student Details</h3>

        <div className="d-flex justify-content-center align-items-center">
          <div className="d-none d-sm-block">
            <button className="btn btn-link me-2" onClick={handleBackBtn}>
              <IoMdArrowRoundBack /> Back
            </button>
          </div>

          <div>
            <Link
              to={`/library/student/edit/${student.id}`}
              className="btn btn-primary btn-sm me-2"
            >
              Edit
            </Link>
            <button className="btn btn-success btn-sm" onClick={handlePayBtn}>
              Pay Fee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetalisHeader;
