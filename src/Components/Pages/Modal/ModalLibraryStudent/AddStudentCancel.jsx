import React from "react";
import { replace, useNavigate } from "react-router-dom";

const AddStudentCancel = ({ setShowModal }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="overlay"></div>
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Cancel</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <div className="modal-body">Are you sure you want to cancel?</div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowModal(false)}
              >
                No
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate("/library", { replace: true })}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudentCancel;
