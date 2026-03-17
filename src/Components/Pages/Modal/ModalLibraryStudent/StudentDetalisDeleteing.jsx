import React from "react";

const StudentDetalisDeleteing = ({ handleDeleteStudent, setShowModal }) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <div className="modal-body">Are you sure you want to delete?</div>

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
                onClick={handleDeleteStudent}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetalisDeleteing;
