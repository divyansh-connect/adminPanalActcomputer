import React from "react";
import { useState } from "react";
import StudentDetalisHeader from "./StudentDetalis/StudentDetalisHeader";
import StudentDetailsBio from "./StudentDetalis/StudentDetailsBio";
import StudentDetailsPayment from "./StudentDetalis/StudentDetailsPayment";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteStd, getStudent } from "../../../Services/LibraryServices";
import StudentDetailsSkeleton from "../Skeleton/StudentDetailsSkeleton";

const StudentDetails = () => {
  const { stdId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getStudent(stdId)
      .then((getStudent) => {
        setStudent(getStudent);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "Unauthorized") return;
        navigate("/error", { replace: true });
      });
  }, []);

  // Deactivate
  const handleDeleteStudent = async () => {
    await deleteStd(student.id);
    navigate("/library", { replace: true });
  };

  return (
    <>
      {loading ? (
        <StudentDetailsSkeleton />
      ) : (
        <div className="container py-4">
          <StudentDetalisHeader student={student} setStudent={setStudent} />
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <StudentDetailsBio
                student={student}
                handleDeleteStudent={handleDeleteStudent}
                setShowModal={setShowModal}
                showModal={showModal}
              ></StudentDetailsBio>
              <hr />
              <StudentDetailsPayment student={student}></StudentDetailsPayment>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDetails;
