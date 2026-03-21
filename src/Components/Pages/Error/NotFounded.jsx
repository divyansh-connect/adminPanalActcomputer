import React from "react";
import { Link } from "react-router-dom";

const NotFounded = ({ err }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-4 text-danger">404</h1>

      <h3 className="mb-3">{err}</h3>

      <p className="text-muted">
        The resource you are looking for does not exist.
      </p>

      <Link to="/students" className="btn btn-primary mt-3">
        click here to back
      </Link>
    </div>
  );
};

export default NotFounded;
