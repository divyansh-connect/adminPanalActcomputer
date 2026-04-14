import React, { useState } from "react";
import StudentPayFee from "./StudentPayFee";
import { useEffect } from "react";
import {
  getAllPaymentsbyId,
  getAllStdAndPay,
} from "../../../Services/InstitudeServices";

import StdsListsSkeleton from "../Skeleton/StdsListsSkeleton";
import { Link } from "react-router-dom";
import FailedFetch from "../Error/FailedFetch";

const StudentList = () => {
  const [student, setStudent] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectStudent, setSelectStudent] = useState({});
  const [search, setSearch] = useState("");
  const [payFee, setPayFee] = useState(false);

  const handlePayBtn = (std) => {
    setSelectStudent(std);
    setPayFee(true);
  };

  const filtered = student.filter((s) =>
    (s.stdName + s.stdPhone + s.stdFathOrHus)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const std = await getAllStdAndPay(controller.signal);
        // handle Student
        if (!std.success) {
        } else {
          setStudent(std.data);
        }
      } catch (error) {
        if (error.message === "Unauthorized") return;
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      controller.abort(); // cleanup
    };
  }, [refresh]);

  const getStatus = (s) => {
    if (s.remaining <= 0) return "Fee Paid";
    if (s.totalPaid > 0) return "Balance";
    return "Fee Due";
  };
  const getStatusClass = (status) => {
    if (status === "Fee Paid") return "bg-success";
    if (status === "Balance") return "bg-info-subtle text-dark";
    return "bg-danger";
  };

  return (
    <>
      {isLoading ? (
        <StdsListsSkeleton />
      ) : (
        <>
          {payFee && (
            <StudentPayFee
              setRefresh={setRefresh}
              student={selectStudent}
              setPayFee={setPayFee}
            />
          )}

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
                    <div className="row text-center fw-semibold border-bottom pb-2 mb-2 ">
                      <div className="col-md-2">Name</div>
                      <div className="col-md-2">Father/Husband</div>
                      <div className="col-md-2">Phone</div>
                      <div className="col-md-2">Course</div>
                      <div className="col-md-2">Status</div>
                      <div className="col-md-2 ">Action</div>
                    </div>
                  </div>

                  {/* Scrollable List */}
                  <div className="students-scroll">
                    {filtered?.map((s) => {
                      const status = getStatus(s);
                      return (
                        <div
                          key={s._id}
                          className=" row align-items-center py-2 border-bottom "
                        >
                          <div className="col-md-2">{s.stdName}</div>
                          <div className="col-md-2">{s.stdFathOrHus}</div>
                          <div className="col-md-2">{s.stdPhone}</div>
                          <div className="col-md-2">
                            {s.courseId.courseName}
                          </div>
                          <div className="col-md-2 text-center">
                            <span
                              className={`badge px-4 py-2 ${getStatusClass(status)} `}
                            >
                              {status}
                            </span>
                          </div>

                          <div className="col-md-2 text-end">
                            <Link
                              to={`/students/${s._id}`}
                              className="btn btn-sm btn-outline-primary me-2"
                            >
                              View
                            </Link>
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => {
                                handlePayBtn(s);
                              }}
                            >
                              Pay Fee
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
