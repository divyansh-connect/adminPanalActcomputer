import React, { useState } from "react";
import StudentPayFee from "./StudentPayFee";
import { useEffect } from "react";
import { getAllStdAndPay } from "../../../Services/InstitudeServices";
import StdsListsSkeleton from "../Skeleton/StdsListsSkeleton";
import { Link } from "react-router-dom";

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
    if (status === "Balance") return "balanceFee text-light";
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

          <div className="card shadow-sm">
            {/* Header */}
            <div className="card-header">
              <h5 className="my-2 py-2">Act Computer Students List</h5>
              {/* Search */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* above Md screen */}
            <div
              className="card-body pt-0 d-none d-md-block "
              style={{ height: "70vh" }}
            >
              <div className="d-flex flex-column py-2 h-100">
                {/* Header Row */}
                <div className="row fw-bold border-bottom pb-2 mb-3">
                  <div className="col-md-3">Name/ (Phone)</div>
                  <div className="col-md-3">Father/ Husband</div>
                  <div className="col-md-6 d-flex justify-content-evenly gap-2">
                    <div>Course/ Status</div>
                    <div>Action</div>
                  </div>
                </div>

                {/* Scrollable List */}
                <div className="flex-grow-1 students-scroll">
                  {filtered?.map((s) => {
                    const status = getStatus(s);
                    return (
                      <div
                        key={s._id}
                        className="card p-2 px-4 mb-2 shadow-sm "
                      >
                        <div className="row d-flex justify-content-around align-items-center">
                          <div className="col-md-3 px-2 px-lg-3">
                            <strong>{s.stdName}</strong>
                            <p className="small text-muted mb-1">
                              ({s.stdPhone})
                            </p>
                          </div>
                          <div className="col-md-3">{s.stdFathOrHus}</div>

                          <div className="col-md-6 d-flex justify-content-evenly">
                            <div className="d-flex badge justify-content-end rounded w-50">
                              <div
                                className="col-8 col-lg-4 rounded-start py-2 px-1 text-dark "
                                style={{ background: "#b9d4fa" }}
                              >
                                <strong>{s.courseId.courseName}</strong>
                              </div>
                              <div
                                className={`rounded-end px-1 px-lg-2 py-2 ${getStatusClass(status)} `}
                              >
                                {status}
                              </div>
                            </div>
                            <div className="badge rounded d-flex justify-content-center w-50 ">
                              <Link
                                to={`/students/${s._id}`}
                                className="bg-primary text-light rounded-start py-2 px-2 text-decoration-none"
                              >
                                View
                              </Link>
                              <div
                                className="bg-warning text-dark rounded-end py-2 px-2"
                                onClick={() => {
                                  handlePayBtn(s);
                                }}
                              >
                                Pay Fee
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* below Md screen */}
            <div
              className="card-body pt-0 d-block d-md-none p-0"
              style={{ height: "70vh" }}
            >
              <div className="students-scroll h-100 card-body">
                {filtered.map((s) => {
                  const status = getStatus(s);
                  return (
                    <div key={s._id}>
                      <div className="card mb-3">
                        <div className="card-header pe-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <strong>{s.stdName}</strong>
                            <span className="col-6 col-sm-3 badge d-flex rounded small">
                              <span
                                className="flex-grow-1 rounded-start px-2 py-1 text-dark "
                                style={{ background: "#b9d4fa" }}
                              >
                                <strong>{s.courseId.courseName}</strong>
                              </span>
                              <span
                                className={`rounded-end px-2 py-1 ${getStatusClass(status)} `}
                              >
                                {status}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="card-body py-2 pe-1">
                          <div>
                            <strong>F/H: </strong>
                            {s.stdFathOrHus}
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>Ph.: </strong>
                              {s.stdPhone}
                            </div>
                            <div>
                              <div className="badge rounded d-flex justify-content-center py-0 ">
                                <Link
                                  to={`/students/${s._id}`}
                                  className="border border-warning text-dark rounded-start-1 py-1 px-2 text-decoration-none"
                                >
                                  View
                                </Link>
                                <div className="vr bg-danger"></div>
                                <div
                                  className="bg-warning text-dark rounded-end-1 py-1 px-2"
                                  onClick={() => {
                                    handlePayBtn(s);
                                  }}
                                >
                                  Pay Fee
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentList;
