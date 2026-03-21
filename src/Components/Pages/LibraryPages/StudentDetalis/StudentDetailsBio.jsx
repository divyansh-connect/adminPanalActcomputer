import React from "react";
import StudentDetalisDeleteing from "../../Modal/ModalLibraryStudent/StudentDetalisDeleteing";

const StudentDetailsBio = ({
  handleDeleteStudent,
  student,
  setShowModal,
  showModal,
}) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const expiry = new Date(student.vaildDate).setHours(0, 0, 0, 0);
  const isExpired = today > expiry;
  return (
    <>
      <div>
        <div className="row g-2 g-lg-3">
          {/* Left Section */}
          <div className="col-lg-6">
            <div className="card border-0 bg-light h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3 text-primary">
                  Student Information
                </h6>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Name</span>
                  <span className="fw-semibold">{student.name}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Seat No</span>
                  <span className="fw-semibold bg-primary px-3 text-white rounded">
                    Seat {student.seat}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Phone</span>
                  <span className="fw-semibold">+91-{student.phone}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="text-muted">Gender</span>
                  <span className="fw-semibold">
                    {student.gender.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-lg-6">
            <div className="card border-0 bg-light h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3 text-primary">
                  Membership Information
                </h6>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Join Date</span>
                  <span className="fw-semibold">
                    {new Date(student.joinDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Vaild Upto</span>
                  <span className="fw-semibold">
                    {new Date(student.vaildDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Status</span>
                  {isExpired ? (
                    <span className="badge bg-danger px-3">Expired</span>
                  ) : (
                    <span className="badge bg-success px-3">Active</span>
                  )}
                </div>
                <div className="d-flex justify-content-center mb-2 rounded">
                  <button
                    className="btn btn-danger btn-sm "
                    onClick={() => setShowModal(true)}
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <StudentDetalisDeleteing
          handleDeleteStudent={handleDeleteStudent}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default StudentDetailsBio;
