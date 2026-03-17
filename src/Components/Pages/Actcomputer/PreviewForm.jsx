import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const PreviewForm = ({ data, handlePrint, printRef, setPrintFrom }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    setPrintFrom(null);
  };

  return (
    <>
      <div className="container py-4" id="printArea">
        <div ref={printRef} className="card shadow-sm p-4">
          {/* HEADER */}
          <div className="text-center border-bottom pb-3 mb-4">
            <h3 className="fw-bold">ACT COMPUTER SEONI</h3>
            <p className="mb-1">Center Code: {data.InstitudeCode}</p>
            <h5 className="text-uppercase mt-2">Admission Slip</h5>
          </div>

          {/* TOP DETAILS */}
          <div className="row mb-4">
            <div className="col-sm-8">
              <p>
                <strong>Admission Session:</strong> {data.admissionSession}
              </p>

              <p>
                <strong>Admission Date:</strong>{" "}
                {new Date(data.admissionDate).toLocaleDateString()}
              </p>

              <p>
                <strong>Medium:</strong> {data.courseMedium}
              </p>

              <p>
                <strong>Course : </strong> {data.courseName} -{" "}
                {data.courseFullName}
              </p>
            </div>

            <div className="col-sm-4 text-center">
              <img
                src={data.stdPhoto}
                alt="student"
                style={{
                  width: "120px",
                  height: "140px",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>

          {/* STUDENT DETAILS */}
          <h5 className="border-bottom pb-2 mb-3">Student Details</h5>

          <div className="row mb-2">
            <div className="col-sm-6">
              <p>
                <strong>Name:</strong> {data.stdName}
              </p>
            </div>
            <div className="col-sm-6">
              <p>
                <strong>Father/Husband:</strong> {data.stdFathOrHus}
              </p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-sm-6">
              <p>
                <strong>Mother:</strong> {data.stdMother}
              </p>
            </div>
            <div className="col-sm-6">
              <p>
                <strong>Gender:</strong> {data.stdGender}
              </p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-sm-6">
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(data.stdDOB).toLocaleDateString()}
              </p>
            </div>
            <div className="col-sm-6">
              <p>
                <strong>Category:</strong> {data.stdCategory}
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <h5 className="border-bottom pb-2 mt-4 mb-3">Contact Details</h5>

          <div className="row mb-2">
            <div className="col-sm-6">
              <p>
                <strong>Mobile:</strong> {data.stdPhone}
              </p>
            </div>
            <div className="col-sm-6">
              <p>
                <strong>Email:</strong> {data.stdEmail || "-"}
              </p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-sm-6">
              <p>
                <strong>Aadhaar:</strong> {data.stdAadhar}
              </p>
            </div>
          </div>

          {/* ADDRESS */}
          <h5 className="border-bottom pb-2 mt-4 mb-3">Address</h5>

          <p>
            {data.stdAddresh || "-"}, {data.stdCity}, {data.stdState} -{" "}
            {data.stdPinCode}
          </p>

          {/* SIGNATURE */}
          <div className="row mt-5 text-center">
            <div className="col-sm-6">
              <p>_____________________</p>
              <p>Student Signature</p>
            </div>

            <div className="col-sm-6">
              <p>_____________________</p>
              <p>Center Head</p>
            </div>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="text-center mt-4 no-print">
          <button className="btn btn-primary me-3" onClick={handlePrint}>
            Print
          </button>

          <button className="btn btn-secondary" onClick={handleGoBack}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default PreviewForm;
