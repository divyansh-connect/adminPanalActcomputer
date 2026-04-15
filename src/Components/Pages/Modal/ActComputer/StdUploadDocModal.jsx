import React, { useState } from "react";
import { uploadStdDoc } from "../../../../Services/uploadServices";

const StdUploadDocModal = ({ setUpload, student, setStdDoc }) => {
  //
  const [filekey, setFilekey] = useState({ diploma: "", marksheet: "" });
  const [errorMsg, setErrorMsg] = useState({
    marksheet: "",
    diploma: "",
    isSave: "",
  });
  const [files, setFiles] = useState({
    marksheet: { type: null, selectFile: null },
    diploma: { type: null, selectFile: null },
  });
  const [loading, setLoading] = useState({ marksheet: false, diploma: false });

  const validateFile = (file) => {
    if (!file) {
      return "Please select a file";
    }
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      return "Only JPG,JPEG,PNG & PDF images allowed";
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return "File size should be less than 5MB";
    }
    return null;
  };

  const handleFileChnage = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const error = validateFile(file);

    setFiles((prev) => ({
      ...prev,
      [name]: { type: error ? null : name, selectFile: error ? null : file },
    }));

    setErrorMsg((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleUploadFiles = async (fileName) => {
    setLoading({ ...loading, [fileName]: true });
    const error = validateFile(files[fileName]?.selectFile);

    if (error) {
      setErrorMsg((prev) => ({ ...prev, [fileName]: error }));
      setFiles((prev) => ({
        ...prev,
        [fileName]: { type: null, selectFile: null },
      }));
      setLoading({ ...loading, [fileName]: false });
      return;
    }
    const payload = {
      studentId: student._id,
      type: fileName,
      file: files[fileName].selectFile,
    };
    // Api calls
    try {
      const response = await uploadStdDoc(payload);
      if (!response.success) {
        setErrorMsg((prev) => ({ ...prev, isSave: response.message }));
        return;
      }
      setStdDoc((prew) => [response.data, ...prew]);
      setErrorMsg((prev) => ({ ...prev, isSave: response.message }));
    } catch (error) {
      if (error.message === "Unauthorized") return;
      setErrorMsg({ ...errorMsg, isSave: error.message });
    } finally {
      setFiles((prev) => ({
        ...prev,
        [fileName]: { type: null, selectFile: null },
      }));
      setLoading((prev) => ({ ...prev, [fileName]: false }));
      setFilekey((prev) => ({
        ...prev,
        [fileName]: Date.now(),
      }));
    }
  };

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
            {errorMsg.isSave && (
              <div className="pt-3 text-danger small text-center">
                {errorMsg.isSave}
              </div>
            )}
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
                    key={filekey.marksheet}
                    className="form-control"
                    name="marksheet"
                    accept="image/*, application/pdf"
                    onChange={handleFileChnage}
                    disabled={loading.marksheet}
                  />

                  <button
                    className="btn btn-success d-flex align-items-center"
                    onClick={() => handleUploadFiles("marksheet")}
                    disabled={!files.marksheet.selectFile || loading.marksheet}
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
                {errorMsg.marksheet ? (
                  <div className="text-danger small">{errorMsg.marksheet}</div>
                ) : (
                  <div className="text-success small">Upload max 5MB</div>
                )}
              </div>

              {/* Diploma Upload */}
              <div className="mb-2">
                <label className="form-label fw-semibold">
                  Diploma Certificate
                </label>

                <div className="d-flex gap-2">
                  <input
                    type="file"
                    key={filekey.diploma}
                    className="form-control"
                    name="diploma"
                    accept="image/*, application/pdf"
                    onChange={handleFileChnage}
                    disabled={loading.diploma}
                  />

                  <button
                    className="btn btn-success d-flex align-items-center"
                    onClick={() => handleUploadFiles("diploma")}
                    disabled={!files.diploma.selectFile || loading.diploma}
                  >
                    {loading.diploma ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </button>
                </div>
                {errorMsg.diploma ? (
                  <div className="text-danger small">{errorMsg.diploma}</div>
                ) : (
                  <div className="text-success small">Upload max 5MB</div>
                )}
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
