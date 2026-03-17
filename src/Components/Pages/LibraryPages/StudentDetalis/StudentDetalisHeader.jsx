import React from "react";
import { useState } from "react";
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

        <div>
          <button
            className="btn btn-md btn-secondary btn-sm me-2"
            onClick={handleBackBtn}
          >
            Back
          </button>
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
  );
};

export default StudentDetalisHeader;
