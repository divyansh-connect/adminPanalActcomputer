import React from "react";
import { studentData } from "../../../../DemoData/LibarySeat";

const StudentDetails = ({ student }) => {
  return (
    <div className=" d-none d-sm-block container-fluid mb-3 px-0">
      <div className="card shadow-sm border-0 ">
        <div className="card-body fees">
          <h6 className="mb-3 fw-bold">Student Details</h6>

          <div className="row bg-light rounded p-2 h-100">
            {/* Column 1 */}
            <div className="col-sm-6 col-lg-4 ">
              <p className="mb-2">
                <strong>Father:</strong> {student.stdFathOrHus}
              </p>
              <p className="mb-2">
                <strong>Mother:</strong> {student.stdMother}
              </p>
              <p className="mb-2">
                <strong>DOB:</strong>{" "}
                {new Date(student.stdDOB).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Gender:</strong> {student.stdGender}
              </p>
            </div>

            {/* Column 2 */}
            <div className="col-sm-6 col-lg-4 ">
              <p className="mb-2">
                <strong>Adm Date:</strong>{" "}
                {new Date(student.admissionDate).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Medium:</strong> {student.courseMedium.toUpperCase()}
              </p>
              <p className="mb-2">
                <strong>Session:</strong> {student.admissionSession}
              </p>
              <p className="mb-2">
                <strong>Category:</strong> {student.stdCategory.toUpperCase()}
              </p>
            </div>

            {/* Column 3 */}
            <div className="d-none d-lg-block col-lg-4 ">
              <p className="mb-2">
                <strong>Aadhar:</strong> {student.stdAadhar}
              </p>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                {student.stdEmail ? student.stdEmail : "N/A"}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {student.stdAddresh || "N/A"},{" "}
                {student.stdCity} {student.stdState} {student.stdPinCode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
