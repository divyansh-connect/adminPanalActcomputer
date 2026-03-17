import React, { useRef, useState } from "react";
import { uploadStudyMaterial } from "../../../Services/InstitudeServices";
import { uploadStudyMaterialFile } from "../../../Services/uploadServices";

const StudyMaterialsUpload = ({ uploadMaterials, setUploadMaterials }) => {
  const studyCourses = useRef();
  const studyTitle = useRef();
  const studyFile = useRef();
  const [uploadInput, setUploadInput] = useState("");
  const [validator, setValidator] = useState({
    title: "",
    upload: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = {};
    const demoImput = uploadInput;
    const courses = studyCourses.current.value;
    const title = studyTitle.current.value.trim();
    const upload = studyFile.current.files[0];
    if (!upload) {
      error.upload = "Pdf required";
    }
    if (!demoImput) {
      error.upload = "First upload pdf";
    }
    if (!title) {
      error.title = "Title is required";
    }
    setValidator(error);
    if (Object.keys(error).length === 0) {
      const payload = {
        courses: courses,
        title: title,
        upload: upload,
      };
    }
  };

  return (
    <div className="mt-4 mb-3">
      <div className="card shadow p-3 form-card">
        <div className="mb-4">
          <h3 className="text-center ">Upload Study Materials</h3>
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
              <label className="form-label">Course*</label>
              <select className="form-select" ref={studyCourses}>
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
                required
                ref={studyTitle}
              />
            </div>

            {/* File Upload */}
            <div className="col-md-4 mb-3">
              <label className="form-label">
                Upload Pdf*
                {validator.upload && (
                  <span className="mx-2 text-danger text-center small">
                    {validator.upload}
                  </span>
                )}
              </label>
              <div className="d-flex">
                <input
                  type="file"
                  ref={studyFile}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setUploadInput(file.name);
                  }}
                />
                <button
                  type="button"
                  className={`btn btn-outline-primary`}
                  onClick={() => {
                    studyFile.current.click();
                  }}
                >
                  Upload
                </button>
                <input
                  type="text"
                  className="form-control mx-1"
                  readOnly
                  value={uploadInput}
                />
              </div>
            </div>

            {/* Button */}
            <div className="col-md-12 mb-3">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudyMaterialsUpload;
