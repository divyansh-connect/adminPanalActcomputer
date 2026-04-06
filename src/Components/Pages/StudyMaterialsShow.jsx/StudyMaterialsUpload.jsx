import React, { useRef, useState } from "react";
import { uploadStudyMaterialFile } from "../../../Services/uploadServices";

const StudyMaterialsUpload = ({ setUploadMaterials }) => {
  const [formData, setFormData] = useState({
    course: "",
    title: "",
  });
  const studyFile = useRef();

  const [uploading, setUploading] = useState(false);
  const [validator, setValidator] = useState({
    course: "",
    title: "",
    upload: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUploading(true);
    const error = {};
    const upload = studyFile.current.files[0];

    // validator
    if (!formData.title) {
      error.title = "Title is required";
    }
    if (!formData.course) {
      error.course = "Select course";
    }
    if (!upload) {
      error.upload = "Pdf is required";
    }
    if (upload && upload.type !== "application/pdf") {
      error.upload = "Only PDF file allowed";
    }
    if (upload && upload.size > 5 * 1024 * 1024) {
      error.upload = "File size must be less than 5 MB";
    }
    setValidator(error);

    if (Object.keys(error).length > 0) {
      setUploading(false);
      return;
    }

    try {
      const payload = {
        courses: formData.course,
        title: formData.title,
        upload: upload,
      };

      const response = await uploadStudyMaterialFile(payload);

      if (!response.success) {
        return setValidator({ error: response.message });
      }

      setUploadMaterials((prev) => [response.data, ...prev]);
      setValidator({ error: response.message });
      setFormData({ title: "", course: "" });
      studyFile.current.value = null;
    } catch (error) {
      if (error.message === "Unauthorized") return;
      setValidator({ error: error.message || "Server Error" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-3">
      <div className="card shadow p-3 form-card">
        <div className="my-3">
          <h3 className="text-center fw-semibold ">Upload Study Materials</h3>
          {validator.error && (
            <div className="mx-2 text-danger text-center small">
              {validator.error}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row align-items-end">
            {/* Course */}
            <div className="col-md-2 mb-3">
              <label className="form-label">
                Course*
                {validator.course && (
                  <span className="mx-2 text-danger text-center small">
                    {validator.course}
                  </span>
                )}
              </label>
              <select
                className="form-select"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              >
                <option value="">Select</option>
                <option>DCA</option>
                <option>PGDCA</option>
              </select>
            </div>

            {/* Title */}
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Title*
                {validator.title && (
                  <span className="mx-2 text-danger text-center small">
                    {validator.title}
                  </span>
                )}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                value={formData.title}
                required
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* File Upload */}
            <div className="col-md-4 mb-3">
              <label className="form-label">
                Upload Pdf*
                {validator.upload ? (
                  <span className="mx-2 text-danger text-center small">
                    {validator.upload}
                  </span>
                ) : (
                  <span className="mx-2 text-success small">
                    Upload max 5MB
                  </span>
                )}
              </label>
              <div className="d-flex ">
                <input
                  type="file"
                  className="form-control"
                  ref={studyFile}
                  accept="application/pdf"
                />
              </div>
            </div>

            {/* Button */}
            <div className="col-md-12 mb-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudyMaterialsUpload;
