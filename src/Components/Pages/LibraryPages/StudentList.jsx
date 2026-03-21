import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import { getStudentList } from "../../../Services/LibraryServices";
import FailedFetch from "../Error/FailedFetch";
import StdsListsSkeleton from "../Skeleton/StdsListsSkeleton";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const today = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    getStudentList()
      .then((allLists) => {
        setStudents(allLists);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "Unauthorized") return;
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="d-flex flex-column h-100 container py-4 px-1 bg-light-subtle rounded ">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2 p-3">
        <h4 className="fw-bold">Library Students</h4>
        <Link to="/library/seats" className="btn btn-link">
          + Add Student
        </Link>
      </div>
      {loading ? (
        <StdsListsSkeleton />
      ) : (
        <>
          {/* Desktop Table */}
          <div className=" flex-grow-1 d-none d-md-block">
            <div className="card shadow-sm h-100 ">
              {error ? (
                <FailedFetch />
              ) : (
                <div className="card-body table-responsive libraryListShow">
                  <table className="table table-hover align-middle text-center ">
                    <thead className="table-light ">
                      <tr>
                        <th>Seat</th>
                        <th className="text-start">Name</th>
                        <th>Join</th>
                        <th>Vaild Upto</th>
                        <th>Fees</th>
                        <th>Details</th>
                      </tr>
                    </thead>

                    <tbody className="">
                      {students.map((std) => {
                        const expiry = new Date(std.vaildDate).setHours(
                          0,
                          0,
                          0,
                          0,
                        );
                        const isExpired = today > expiry;
                        const joinDate = new Date(
                          std.joinDate,
                        ).toLocaleDateString();
                        const vaildDate = new Date(
                          std.vaildDate,
                        ).toLocaleDateString();
                        return (
                          <tr key={std.id}>
                            <td>{std.seat}</td>
                            <td className="text-start">{std.name}</td>
                            <td>{joinDate}</td>
                            <td>{vaildDate}</td>
                            <td>
                              {std.amount === "pending" ? (
                                <span className="badge bg-warning">
                                  pending
                                </span>
                              ) : (
                                <span
                                  className={`badge ${
                                    isExpired ? "bg-danger" : "bg-success"
                                  }`}
                                >
                                  {isExpired ? "Unpaid" : "Paid"}
                                </span>
                              )}
                            </td>
                            <td>
                              <Link
                                to={`/library/student/${std.id}`}
                                className="btn btn-sm btn-link"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Mobile Card View */}
      <div className="d-md-none">
        {error ? (
          <FailedFetch />
        ) : (
          <>
            {students.map((std) => {
              const joinDate = new Date(std.joinDate).toLocaleDateString();
              const vaildDate = new Date(std.vaildDate).toLocaleDateString();
              const expiry = new Date(std.vaildDate).setHours(0, 0, 0, 0);
              const isExpired = today > expiry;

              return (
                <div key={std.id} className="card shadow-sm mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2 flex-wrap">
                      <div className="d-flex flex-wrap gap-2">
                        <h6 className="fw-bold mb-0">{std.name}</h6>
                        {std.amount === "pending" && (
                          <span className="badge bg-warning">pending</span>
                        )}
                      </div>

                      <span className=" badge bg-danger">Seat {std.seat}</span>
                    </div>

                    <p className="mb-1 small">📅 Join: {joinDate}</p>

                    <p className="mb-2 small">⏳ Expiry: {vaildDate}</p>

                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className={`badge ${
                          isExpired ? "bg-danger" : "bg-success"
                        }`}
                      >
                        {isExpired ? "Unpaid" : "Paid"}
                      </span>

                      <Link
                        to={`/library/student/${std.id}`}
                        className="btn btn-sm btn-link"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentsList;
