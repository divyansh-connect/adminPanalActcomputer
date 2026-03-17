import React, { useEffect, useRef, useState } from "react";
import { stdAdmUpload } from "../../../Services/uploadServices";
import {
  getCourse,
  stdAdmSubmitting,
} from "../../../Services/InstitudeServices";

const FormFill = ({
  handleFileChange,
  courses,
  setErrShow,
  errshow,
  isUploading,
  fileRef,
  preview,
  setPrintFrom,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const sessions = [
    "2023-24",
    "2024-25",
    "2025-26",
    "2026-27",
    "2027-28",
    "2028-29",
    "2029-30",
    "2030-31",
    "2031-32",
    "2032-33",
    "2033-34",
    "2034-35",
    "2035-36",
    "2036-37",
  ];

  const [formData, setFormData] = useState({
    cName: "Act Computer Center",
    cCode: 6085,
    admSession: "",
    cId: "",
    cMedium: "",
    admDate: "",
    stdEnroll: null,
    stdName: "",
    stdFathOrHus: "",
    stdMoth: "",
    stdGender: "",
    stdCategory: "",
    stdDOB: "",
    stdPhoto: "",
    stdAadhar: "",
    stdPhone: "",
    stdEmail: "",
    stdAddresh: "",
    stdCity: "",
    stdState: "",
    stdPinCode: "",
  });

  const handleFormSubmit = async () => {
    const errMsg = {};
    try {
      setIsSubmitting(true);
      const cleanData = {
        ...formData,
        stdName: formData.stdName.trim(),
        stdFathOrHus: formData.stdFathOrHus.trim(),
        stdMoth: formData.stdMoth.trim(),
        stdCity: formData.stdCity.trim(),
        stdState: formData.stdState.trim(),
        stdEmail: formData.stdEmail.trim(),
        stdAddresh: formData.stdAddresh.trim(),
        stdPhoto: preview,
      };
      if (!cleanData.stdPhoto) {
        errMsg.stdPhoto = "First upload the passport photo";
      }
      if (!cleanData.admSession) {
        errMsg.admSession = "Academic session is required";
      }
      if (!cleanData.cId) {
        errMsg.cId = "Course is required";
      }
      if (!cleanData.cMedium) {
        errMsg.cMedium = "Medium is required";
      }
      if (!cleanData.admDate) {
        errMsg.admDate = "Admission date is required";
      }
      if (!cleanData.stdName) {
        errMsg.stdName = "Student name is required";
      }
      if (!cleanData.stdFathOrHus) {
        errMsg.stdFathOrHus = "Father/Husband name is required";
      }
      if (!cleanData.stdGender) {
        errMsg.stdGender = "Gender is required";
      }
      if (!cleanData.stdCategory) {
        errMsg.stdCategory = "Category is required";
      }
      if (!cleanData.stdDOB) {
        errMsg.stdDOB = "Date of birth is required";
      }
      if (!cleanData.stdAadhar || cleanData.stdAadhar.length !== 12) {
        errMsg.stdAadhar = "Valid Aadhaar required";
      }
      if (!cleanData.stdPhone || cleanData.stdPhone.length !== 10) {
        errMsg.stdPhone = "Valid mobile number required";
      }
      if (!cleanData.stdCity) {
        errMsg.stdCity = "City is required";
      }
      if (!cleanData.stdState) {
        errMsg.stdState = "State is required";
      }
      if (!cleanData.stdPinCode || cleanData.stdPinCode.length !== 6) {
        errMsg.stdPinCode = "Valid pin code required";
      }
      setErrShow(errMsg);

      if (Object.keys(errMsg).length === 0) {
        // Api Call
        const response = await stdAdmSubmitting(cleanData);
        if (!response.success) {
          setServerMsg(response.message || "Colud not upload");
        }
        const data = response.data;
        const course = courses.find((c) => c._id === data.courseId);
        console.log("FromFill", { ...data, course });
        setPrintFrom({
          ...data,
          courseName: course?.courseName,
          courseFullName: course?.courseFullName,
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(error.success);
      setServerMsg(error.message);
    }
  };
  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header text-center bg-primary text-white">
          <h5 className="mb-0">Act Computer Admission Form</h5>
        </div>

        <div className="card-body">
          {/* CENTER DETAILS */}

          {serverMsg && (
            <div className="text-danger text-center fs-5 small">
              {serverMsg}
            </div>
          )}
          <h5 className="mb-3 text-danger ">Center Details</h5>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Center Name <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                className="form-control"
                defaultValue="ACT COMPUTER CENTER"
                disabled
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Center Code <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input className="form-control" defaultValue="6085" disabled />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Academic Session <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <select
                className="form-select"
                value={formData.admSession}
                onChange={(e) => {
                  setFormData({ ...formData, admSession: e.target.value });
                }}
                required
              >
                <option value="">Academic Session</option>
                {sessions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
              {errshow.admSession && (
                <div className="text-danger small">{errshow.admSession}</div>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Course Name <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <select
                className="form-select"
                value={formData.cId}
                onChange={(e) => {
                  setFormData({ ...formData, cId: e.target.value });
                }}
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName} ({course.courseFullName})
                  </option>
                ))}
              </select>
              {errshow.cId && (
                <div className="text-danger small">{errshow.cId}</div>
              )}
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <label className="col-md-3 col-form-label">
              Medium <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <select
                className="form-select"
                value={formData.cMedium}
                onChange={(e) => {
                  setFormData({ ...formData, cMedium: e.target.value });
                }}
                required
              >
                <option value="">Select Medium</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
              {errshow.cMedium && (
                <div className="text-danger small">{errshow.cMedium}</div>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Admission Date <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                type="date"
                className="form-control"
                value={formData.admDate}
                onChange={(e) => {
                  setFormData({ ...formData, admDate: e.target.value });
                }}
                required
              />
              {errshow.admDate && (
                <div className="text-danger small">{errshow.admDate}</div>
              )}
            </div>
          </div>
          <hr />

          {/* STUDENT DETAILS */}

          <h5 className="mb-3 text-danger">Student Details</h5>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Student Names <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="Enter student name"
                value={formData.stdName}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                }}
                onChange={(e) => {
                  setFormData({ ...formData, stdName: e.target.value });
                }}
                required
              />
              {errshow.stdName && (
                <div className="text-danger small">{errshow.stdName}</div>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Father's / Husband's Name <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="Enter father name"
                value={formData.stdFathOrHus}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                }}
                onChange={(e) => {
                  setFormData({ ...formData, stdFathOrHus: e.target.value });
                }}
                required
              />
              {errshow.stdFathOrHus && (
                <div className="text-danger small">{errshow.stdFathOrHus}</div>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">Mother Name</label>
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="Enter mother name"
                value={formData.stdMoth}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                }}
                onChange={(e) => {
                  setFormData({ ...formData, stdMoth: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Gender <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <select
                className="form-select"
                value={formData.stdGender}
                onChange={(e) => {
                  setFormData({ ...formData, stdGender: e.target.value });
                }}
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errshow.stdGender && (
                <div className="text-danger small">{errshow.stdGender}</div>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Category <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <select
                className="form-select"
                value={formData.stdCategory}
                onChange={(e) => {
                  setFormData({ ...formData, stdCategory: e.target.value });
                }}
                required
              >
                <option value="">Select Category</option>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
              </select>
              {errshow.stdCategory && (
                <div className="text-danger small">{errshow.stdCategory}</div>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                type="date"
                className="form-control"
                value={formData.stdDOB}
                onChange={(e) => {
                  setFormData({ ...formData, stdDOB: e.target.value });
                }}
                required
              />
              {errshow.stdDOB && (
                <div className="text-danger small">{errshow.stdDOB}</div>
              )}
            </div>
          </div>

          {/* PHOTO UPLOAD */}

          <div className="row mb-4 align-items-center">
            <div className="col-md-3">
              <label className="col-form-label">
                Student Photo <span className="text-danger">*</span>
              </label>
              <div>
                <small className="text-muted col-md-3">
                  Photo must be less than 1MB and maximum 400×400 pixels.
                </small>
              </div>
            </div>
            <div className="col-md-9">
              <div className=" d-flex align-items-center gap-3">
                <input
                  type="file"
                  ref={fileRef}
                  onChange={(e) => handleFileChange(e)}
                  accept="image/*"
                  style={{ display: "none" }}
                />

                <button
                  type="submit"
                  className={`btn ${isUploading ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => fileRef.current.click()}
                  disabled={isUploading || preview}
                >
                  {isUploading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Uploading...
                    </>
                  ) : preview ? (
                    "Uploaded"
                  ) : (
                    "Upload Photo"
                  )}
                  {}
                </button>

                <div
                  className="border rounded d-flex align-items-center justify-content-center"
                  style={{
                    width: "90px",
                    height: "90px",
                    overflow: "hidden",
                    background: "#f8f9fa",
                  }}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <small className="text-muted text-center">No Photo</small>
                  )}
                </div>
              </div>
              {errshow.stdPhoto && (
                <div className="text-danger small">{errshow.stdPhoto}</div>
              )}
            </div>
          </div>

          <hr />

          {/* CONTACT */}

          <h5 className="mb-3 text-danger">Contact Details</h5>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Aadhaar No <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                type="tel"
                maxLength="12"
                className="form-control"
                placeholder="Enter Aadhaar number"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                value={formData.stdAadhar}
                onChange={(e) => {
                  setFormData({ ...formData, stdAadhar: e.target.value });
                }}
                required
              />
              {errshow.stdAadhar && (
                <div className="text-danger small">{errshow.stdAadhar}</div>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              Mobile No <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                type="tel"
                maxLength="10"
                className="form-control"
                placeholder="Enter mobile number"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                value={formData.stdPhone}
                onChange={(e) => {
                  setFormData({ ...formData, stdPhone: e.target.value });
                }}
                required
              />
              {errshow.stdPhone && (
                <div className="text-danger small">{errshow.stdPhone}</div>
              )}
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <label className="col-md-3 col-form-label">Email</label>
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="Enter email"
                value={formData.stdEmail}
                onChange={(e) => {
                  setFormData({ ...formData, stdEmail: e.target.value });
                }}
              />
            </div>
          </div>

          <hr />

          {/* ADDRESS */}

          <h5 className="mb-3 text-danger">Address</h5>

          <div className="row mb-3">
            <label className="col-md-3 col-form-label">Address</label>
            <div className="col-md-9">
              <textarea
                className="form-control"
                rows="2"
                placeholder="Enter full address"
                value={formData.stdAddresh}
                onChange={(e) => {
                  setFormData({ ...formData, stdAddresh: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              City <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="City"
                value={formData.stdCity}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                }}
                onChange={(e) => {
                  setFormData({ ...formData, stdCity: e.target.value });
                }}
                required
              />
              {errshow.stdCity && (
                <div className="text-danger small">{errshow.stdCity}</div>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label">
              State <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="State"
                value={formData.stdState}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                }}
                onChange={(e) => {
                  setFormData({ ...formData, stdState: e.target.value });
                }}
                required
              />
              {errshow.stdState && (
                <div className="text-danger small">{errshow.stdState}</div>
              )}
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <label className="col-md-3 col-form-label">
              Pin Code <span className="text-danger">*</span>
            </label>
            <div className="col-md-9">
              <input
                type="tel"
                maxLength="6"
                className="form-control"
                placeholder="Pin code"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                value={formData.stdPinCode}
                onChange={(e) => {
                  setFormData({ ...formData, stdPinCode: e.target.value });
                }}
                required
              />
              {errshow.stdPinCode && (
                <div className="text-danger small">{errshow.stdPinCode}</div>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              className={`btn ${isSubmitting ? "btn-outline-success" : "btn-success"}  px-5"`}
              onClick={handleFormSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFill;
