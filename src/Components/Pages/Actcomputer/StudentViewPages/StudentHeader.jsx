import React, { useState } from "react";
import { studentData } from "../../../../DemoData/LibarySeat";
import StdCompleted from "../../Modal/ActComputer/StdCompleted";

const StudentHeader = ({ student, setPayFee, setComplete }) => {
  return (
    <>
      <div className="container-fluid bg-white shadow-sm p-3 mb-3 rounded">
        <div className="row align-items-center">
          {/* LEFT: Student Info */}
          <div className="col-md-8 col-12 mb-3 mb-md-0">
            <div className="d-flex align-items-center gap-3">
              {/* Photo */}
              <img
                src={`https://res.cloudinary.com/dymmhktej/image/upload/v1773068656/admissionPhoto/gimiiuhrps39w2sn54bv.jpg`}
                alt="student"
                className="rounded"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />

              {/* Info */}
              <div>
                <h5 className="mb-1">
                  {student.stdName}{" "}
                  <span
                    className={`badge small ${student.isDeleted ? "bg-danger" : "bg-success"}`}
                  >
                    {student.isDeleted ? "Inactive" : "Active"}
                  </span>
                </h5>

                <div className="text-muted small">
                  🏫{" "}
                  <strong>
                    {student.courseId.courseName}{" "}
                    <span>({student.courseId.courseFullName})</span>
                  </strong>
                </div>

                <div className="text-muted small">
                  📞 +91 {student.stdPhone} | <span>📍 {student.stdCity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="col-md-4 col-12 text-md-end d-flex flex-wrap gap-2 justify-content-end">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => {
                setPayFee(true);
              }}
            >
              Pay Fee
            </button>

            <button className="btn btn-primary btn-sm" onClick={"onUploadDoc"}>
              Upload Doc
            </button>

            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                setComplete(true);
              }}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHeader;
