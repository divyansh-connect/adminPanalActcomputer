import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import AddStudentCancel from "../../Modal/ModalLibraryStudent/AddStudentCancel";
import {
  getSeats,
  getStudent,
  putStdEdit,
} from "../../../../Services/LibraryServices";
import StdDetailsEditSkeleton from "../../Skeleton/StdDetailsEditSkeleton";

const StudentDetailsEditing = () => {
  const { stdId } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [seats, setSeats] = useState([]);
  const [showPayModal, setShowPayModal] = useState(false);
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const getblankSeat = await getSeats();
        const getStd = await getStudent(stdId);
        setSeats(getblankSeat);
        setStudent(getStd);
      } catch (err) {
        navigate("/error", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const handleSaveBtn = async () => {
    setSaving(true);
    const stdChangePayload = {
      stdName: student.name.trim().replace(/\.+$/, ""),
      stdPhone: student.phone.trim(),
      stdGender: student.gender,
      stdNewSeat: student.seat,
    };
    try {
      const response = await putStdEdit(student.id, stdChangePayload);
      if (!response.success) {
        return navigate("/error", {
          replace: true,
          state: response.message,
        });
      }
      setSaving(false);
      navigate("/library");
    } catch (error) {
      return navigate("/error", {
        replace: true,
        state: response.message,
      });
    }
  };

  let isExpired = false;
  if (student?.vaildDate) {
    const today = new Date().setHours(0, 0, 0, 0);
    const expiry = new Date(student.vaildDate).setHours(0, 0, 0, 0);
    isExpired = today > expiry;
  }
  return (
    <>
      {loading ? (
        <StdDetailsEditSkeleton />
      ) : (
        <>
          <div className="container py-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold">Edit Student</h3>
              <Link
                to={`/library/student/${student?.id}`}
                className="btn btn-link"
              >
                <IoMdArrowRoundBack /> Back
              </Link>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="row g-4">
                  {/* Basic Info */}
                  <div className="col-md-6">
                    <div className="card bg-light border-0 h-100">
                      <div className="card-body">
                        <h6 className="fw-bold text-primary mb-3">
                          Basic Information
                        </h6>

                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter full name"
                            defaultValue={student?.name}
                            onChange={(e) => {
                              setStudent({ ...student, name: e.target.value });
                            }}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input
                            type="tel"
                            maxLength="10"
                            className="form-control"
                            placeholder="Enter Phone Number"
                            defaultValue={student?.phone}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                "",
                              );
                            }}
                            onChange={(e) => {
                              setStudent({ ...student, phone: e.target.value });
                            }}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Gender</label>
                          <select
                            className="form-select"
                            value={student?.gender}
                            onChange={(e) => {
                              setStudent({
                                ...student,
                                gender: e.target.value,
                              });
                            }}
                          >
                            <option value="male">Male </option>
                            <option value="female">Female</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Change Seat</label>
                          <select
                            className="form-select"
                            value={student?.seat || ""}
                            onChange={(e) => {
                              setStudent({
                                ...student,
                                seat: Number(e.target.value),
                              });
                            }}
                          >
                            {seats
                              .filter(
                                (seat) =>
                                  seat.seat === student?.seat ||
                                  seat.status === "available",
                              )
                              .map((seat) => (
                                <option key={seat?.id} value={seat?.seat}>
                                  Seat {seat?.seat}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Membership Info */}
                  <div className="col-md-6">
                    <div className="card bg-light border-0 h-100">
                      <div className="card-body">
                        <h6 className="fw-bold text-primary mb-3">
                          Membership Info
                        </h6>

                        <div className="mb-3">
                          <label className="form-label">Join Date</label>
                          <input
                            type="date"
                            className="form-control"
                            defaultValue={student?.joinDate?.slice(0, 10)}
                            disabled
                          />

                          <small className="text-muted">
                            Join date cannot be changed
                          </small>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Expiry Date</label>
                          <input
                            type="date"
                            className="form-control"
                            defaultValue={student?.vaildDate?.slice(0, 10)}
                            disabled
                          />
                          <small className="text-muted">
                            Expiry updates automatically after payment
                          </small>
                        </div>

                        <div>
                          <label className="form-label">Status</label>
                          <div>
                            {isExpired ? (
                              <span className="badge bg-danger px-3">
                                Expired
                              </span>
                            ) : (
                              <span className="badge bg-success px-3">
                                Active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setShowModal(true)}
                  >
                    Cancel
                  </button>
                  {saving ? (
                    <button className="btn btn-primary" disabled>
                      Saving......
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={handleSaveBtn}>
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {showModal && <AddStudentCancel setShowModal={setShowModal} />}
        </>
      )}
    </>
  );
};

export default StudentDetailsEditing;
