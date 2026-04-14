import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDashboardStaff } from "../../../Services/dashboard";
import StudyMaterialsSkeleton from "../Skeleton/StudyMaterialsSkeleton";

const DashboardStaff = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await getDashboardStaff();
        if (!response.success) {
          return setError(response.message);
        }
        setStaff(response.data);
      } catch (error) {
        if (error.message === "Unauthorized") return;
        return setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="h-100 d-flex flex-column ">
      {loading ? (
        <StudyMaterialsSkeleton />
      ) : (
        <>
          <div className="rounded dashboardStaff p-1 d-flex flex-column h-100">
            <div className="d-flex justify-content-between align-items-center px-3 py-2">
              <h5 className="fw-semibold my-auto">Staff List</h5>
              <button
                className="btn btn-link text-white"
                onClick={() => navigate("/dashboard/signup")}
              >
                + Add Staff
              </button>
            </div>
            <div className="mb-3 dashboardStaffScroll flex-grow-1">
              {staff.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between align-items-center p-3 m-3 border rounded shadow-sm bg-body-tertiary"
                >
                  {/* Left Side - Info */}
                  <div>
                    <h6 className="mb-1 text-dark">
                      {item.firstName} {item.lastName}
                    </h6>
                    <p className="mb-0 text-muted">@{item.userName}</p>
                  </div>

                  {/* Right Side - Role */}
                  <div>
                    <span
                      className={`badge px-3 py-2 ${
                        item.role === "admin"
                          ? "bg-danger"
                          : item.role === "staff"
                            ? "bg-primary"
                            : "bg-success"
                      }`}
                    >
                      {item.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardStaff;
