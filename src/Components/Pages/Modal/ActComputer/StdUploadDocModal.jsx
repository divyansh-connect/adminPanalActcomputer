import React, { useState } from "react";

const StdUploadDocModal = ({ setUpload, student }) => {
  //
  const [fileMarksheet, setFileMarksheet] = useState({
    name: null,
    selectFile: null,
  });

  const [fileDiploma, setFileDiploma] = useState({
    name: null,
    selectFile: null,
  });

  const [loading, setLoading] = useState({ marksheet: false, diploma: false });

  const handleUploadMarksheet = (e) => {
    setLoading({ ...loading, marksheet: true });
    console.log(student._id, fileMarksheet);
  };
  const handleUploadDiploma = (e) => {};
  return (
    <>
      <div className="overlay"></div>

      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0 rounded-3">
            {/* Header */}
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Upload Documents</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setUpload(false)}
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
                  <strong>Course:</strong> {student.courseId.courseName}
                </p>
                <p className="mb-0">
                  <strong>Session:</strong> {student.admissionSession}
                </p>
              </div>

              {/* Marksheet Upload */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Marksheet (Sem 1 / Sem 2)
                </label>

                <div className="d-flex gap-2">
                  <input
                    type="file"
                    className="form-control"
                    name="marksheet"
                    accept="image/*"
                    onChange={(e) => {
                      setFileMarksheet({
                        name: e.target.name,
                        selectFile: e.target.files[0],
                      });
                    }}
                  />

                  <button
                    className="btn btn-success d-flex align-items-center"
                    onClick={handleUploadMarksheet}
                    disabled={!fileMarksheet.selectFile || loading.marksheet}
                  >
                    {loading.marksheet ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </button>
                </div>
              </div>

              {/* Diploma Upload */}
              <div className="mb-2">
                <label className="form-label fw-semibold">
                  Diploma Certificate
                </label>

                <div className="d-flex gap-2">
                  <input
                    type="file"
                    className="form-control"
                    name="diploma"
                    accept="image/*"
                    onChange={(e) => {
                      setFileDiploma({
                        name: e.target.name,
                        selectFile: e.target.files[0],
                      });
                    }}
                  />

                  <button
                    className="btn btn-success"
                    onClick={handleUploadDiploma}
                    disabled={!fileDiploma.selectFile}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <br />
            <br />
            {/* Footer */}
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setUpload(false)}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StdUploadDocModal;
