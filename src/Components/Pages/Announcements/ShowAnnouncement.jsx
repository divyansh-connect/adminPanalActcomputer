import React from "react";
import { deleteInstituteAnnouncement } from "../../../Services/InstitudeServices";
import { useState } from "react";

const ShowAnnouncement = ({
  announcementList,
  setAnnouncementList,
  fetch,
  setFetch,
}) => {
  const [isDelete, setIsDelete] = useState(null);

  const handleDeleteAnnounced = async (deleteId) => {
    setIsDelete(deleteId);
    try {
      const response = await deleteInstituteAnnouncement(deleteId);
      if (!response.success) {
        return setFetch(response.message);
      }
      setAnnouncementList((prev) =>
        prev.filter((list) => list._id !== deleteId),
      );
    } catch (error) {
      if (error.message === "Unauthorized")
        return setFetch("Please login the account first");
      setFetch(error.message);
    } finally {
      setIsDelete(null);
    }
  };

  return (
    <>
      {announcementList?.length === 0 ? (
        <div className="text-center mt-5">
          <h5>No Announcement Found</h5>
          <p>Upload new announcement to get started</p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="mb-4">Published Announcements</h5>

            <div className="row g-3 studyMaterialScroll">
              {/* Announcement Card */}
              {fetch ? (
                <div className="text-muted fs-3 text-center py-5">{fetch}</div>
              ) : (
                <>
                  {announcementList?.map((list) => (
                    <div className="col-md-6 col-lg-4 mt-2" key={list._id}>
                      <div className="card h-100 border shadow-sm">
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div>
                            <h6 className="fw-semibold mb-2">{list.title}</h6>
                            <p className="text-muted small mb-2">
                              {list.message}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-secondary">
                              {new Date(list.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </small>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                handleDeleteAnnounced(list._id);
                              }}
                              disabled={isDelete === list._id}
                            >
                              {isDelete === list._id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowAnnouncement;
