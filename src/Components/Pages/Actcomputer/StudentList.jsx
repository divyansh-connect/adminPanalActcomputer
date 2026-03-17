import React, { useState } from "react";
import StudentPayFee from "./StudentPayFee";
import { useEffect } from "react";
import { getAllStudents } from "../../../Services/InstitudeServices";

import StdsListsSkeleton from "../Skeleton/StdsListsSkeleton";

const StudentList = () => {
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectStudent, setSelectStudent] = useState({});
  const [search, setSearch] = useState("");
  const [payFee, setPayFee] = useState(false);
  const [feeRecipt, setFeeRecipt] = useState({ success: false, data: {} });

  const handlePayBtn = (std) => {
    setSelectStudent(std);
    setPayFee(true);
  };
  console.log(feeRecipt);

  const filtered = student.filter((s) =>
    (s.stdName + s.stdPhone + s.stdFathOrHus)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  useEffect(() => {
    getAllStudents()
      .then((students) => {
        setStudent(students.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.message === "Unauthorized") return;
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <StdsListsSkeleton />
      ) : (
        <>
          {payFee && (
            <StudentPayFee
              student={selectStudent}
              setPayFee={setPayFee}
              setFeeRecipt={setFeeRecipt}
            />
          )}
          {feeRecipt.success && <div>test {feeRecipt.data.amount} </div>}
          <div className="container-fluid p-2 ">
            <div className="card shadow-sm">
              <div className="card-body">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Students</h5>
                </div>

                {/* Search */}
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search student..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="d-flex flex-column py-2">
                  {/* Header Row */}
                  <div className="d-none d-md-block">
                    <div className="row fw-semibold border-bottom pb-2 mb-2 ">
                      <div className="col-md-2">Name</div>
                      <div className="col-md-2">Father/Husband</div>
                      <div className="col-md-2">Phone</div>
                      <div className="col-md-2">Course</div>
                      <div className="col-md-2">Status</div>
                      <div className="col-md-2 text-end">Action</div>
                    </div>
                  </div>

                  {/* Scrollable List */}
                  <div className="students-scroll">
                    {filtered.map((s) => (
                      <div
                        key={s._id}
                        className="row align-items-center py-2 border-bottom "
                      >
                        <div className="col-md-2">{s.stdName}</div>
                        <div className="col-md-2">{s.stdFathOrHus}</div>
                        <div className="col-md-2">{s.stdPhone}</div>
                        <div className="col-md-2">{s.courseId.courseName}</div>

                        <div className="col-md-2">
                          <span
                            className={`badge ${
                              s.status === "Paid"
                                ? "bg-success"
                                : s.status === "Partial"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                            }`}
                          >
                            {s.status}
                          </span>
                        </div>

                        <div className="col-md-2 text-end">
                          <button className="btn btn-sm btn-outline-primary me-2">
                            View
                          </button>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => {
                              handlePayBtn(s);
                            }}
                          >
                            Pay Fee
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentList;
