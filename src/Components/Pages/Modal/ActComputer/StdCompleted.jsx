import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StdCompleted = ({ setComplete, student }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeactivate = async () => {
    try {
      setLoading(true);

      // API call here
      // await apiFetch...

      alert("Student deactivated successfully");
      setComplete(false);
    } catch (err) {
      alert("Incorrect password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0 rounded-3">
            {/* Header */}
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">⚠️ Completed Course</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setComplete(false)}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {/* Student Info */}
              <div className="mb-3 p-2 bg-light rounded">
                <p className="mb-1">
                  <strong>Name:</strong> {student.stdName}
                </p>
                <p className="mb-1">
                  <strong>Course:</strong> DCA
                </p>
                <p className="mb-0">
                  <strong>Session:</strong> {student.admissionSession}
                </p>
              </div>

              {/* Warning */}
              <div className="alert alert-warning py-2">
                ⚠️ Are you sure you want to mark this course as completed?
              </div>

              {/* Password */}
              <div className="mb-2">
                <label className="form-label fw-semibold">
                  Enter your password to confirm
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setComplete(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                onClick={handleDeactivate}
                disabled={loading}
              >
                {loading ? "Processing..." : "Completed"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StdCompleted;
