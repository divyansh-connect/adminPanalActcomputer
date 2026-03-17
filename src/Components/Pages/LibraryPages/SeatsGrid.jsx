import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSeats } from "../../../Services/LibraryServices";
import SeatsGridSkeleton from "../Skeleton/SeatsGridSkeleton";
import FailedFetch from "../Error/FailedFetch";

const SeatsGrid = () => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getSeats()
      .then((allSeats) => {
        setSeats(allSeats);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h4 className="text-center mb-4 fw-bold">Library Seat Selection</h4>

          {/* Seats Grid */}
          <div className="row g-3 justify-content-center">
            {loading && <SeatsGridSkeleton />}
            {error && <FailedFetch />}
            {seats.map((seat) => (
              <div
                key={seat.id}
                className="seatGrid-div col-3 col-sm-2 col-md-2 col-lg-2"
              >
                {seat.status === "available" ? (
                  <Link
                    to={`/library/seats/add-student/${seat.id}/${seat.seat}`}
                    className="text-decoration-none"
                  >
                    <button className={`btn w-100 h-100 btn-outline-success`}>
                      {seat.seat}
                    </button>
                  </Link>
                ) : (
                  <button className={`btn w-100 h-100 btn-danger`}>
                    {seat.seat}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="d-flex justify-content-center gap-4 mt-5 small">
            <div>
              <span className="badge bg-danger me-2">&nbsp;</span>
              Occupied
            </div>
            <div>
              <span className="badge bg-success me-2">&nbsp;</span>
              Available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatsGrid;
