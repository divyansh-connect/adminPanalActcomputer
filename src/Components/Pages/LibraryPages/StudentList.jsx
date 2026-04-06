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
                      {students?.map((std) => {
                        const expiry = new Date(std.vaildDate).setHours(
                          0,
                          0,
                          0,
                          0,
                        );
                        const isExpired = today > expiry;
                        return (
                          <tr key={std.id}>
                            <td>
                              <span
                                className="badge rounded px-3 py-2 "
                                style={{
                                  background: "#e7f1ff",
                                  color: "#0d6efd",
                                }}
                              >
                                {" "}
                                Seat {std.seat}{" "}
                              </span>
                            </td>
                            <td className="text-start">{std.name}</td>
                            <td>
                              {new Date(std.joinDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </td>
                            <td>
                              {new Date(std.vaildDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </td>
                            <td>
                              {std.amount === "pending" ? (
                                <span className="badge bg-warning text-dark py-2">
                                  Unpaid
                                </span>
                              ) : (
                                <span
                                  className={`badge px-3 py-2 ${
                                    isExpired ? "bg-danger" : "bg-success"
                                  }`}
                                >
                                  {isExpired ? "Due" : "Paid"}
                                </span>
                              )}
                            </td>
                            <td>
                              <Link
                                to={`/library/student/${std.id}`}
                                className="badge bg-primary nav-link px-3 py-2"
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
            {students?.map((std) => {
              const expiry = new Date(std.vaildDate).setHours(0, 0, 0, 0);
              const isExpired = today > expiry;
              return (
                <div key={std.id} className="card shadow-sm mb-2">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2 ">
                      <h6 className="fw-bold mb-0">{std.name}</h6>

                      <div className="badge rounded pe-0">
                        <span
                          className=" rounded-start px-2 py-1"
                          style={{ background: "#d1f5f0", color: "#0f766e" }}
                        >
                          Seat {std.seat}
                        </span>
                        {std.amount === "pending" ? (
                          <span className=" rounded-end bg-warning text-dark px-2 py-1">
                            Unpaid
                          </span>
                        ) : (
                          <span
                            className={` rounded-end px-2 py-1 ${
                              isExpired ? "bg-danger" : "bg-success"
                            }`}
                          >
                            {isExpired ? "Due" : "Paid"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2 ">
                      <p className="mb-0 small">
                        <strong> Expiry: </strong>
                        {new Date(std.vaildDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mb-2 ">
                      <p className="mb-0 small">
                        <strong> Join Date: </strong>
                        {new Date(std.joinDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <Link
                        to={`/library/student/${std.id}`}
                        className="badge bg-primary nav-link px-4 py-2"
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
