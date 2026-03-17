import React from "react";
import { useEffect } from "react";
import {
  deleteInstituteAnnouncement,
  getinstituteAnnouncement,
} from "../../../Services/InstitudeServices";
import { useState } from "react";

const ShowAnnouncement = ({ refresh, setRefresh, setLoading }) => {
  const [fetch, setFetch] = useState("");

  const [announcementList, setAnnouncementList] = useState([]);
  useEffect(() => {
    getinstituteAnnouncement()
      .then((lists) => {
        setLoading(false);
        setAnnouncementList(lists.data);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") return;
        return setFetch(error.message || "Server error");
      });
  }, [refresh]);

  const handleDeleteAnnounced = async (deleteId) => {
    try {
      const response = await deleteInstituteAnnouncement(deleteId);
      if (!response.success) {
        return setFetch(response.message);
      }
      setRefresh((prew) => !prew);
    } catch (error) {
      if (error.message === "Unauthorized")
        return setFetch("Please login the account first");
      setFetch(error.message);
    }
  };

  return (
    <>
      {announcementList.length > 0 && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Published Announcements</h5>

            <div className="row g-3">
              {/* Announcement Card */}
              {fetch ? (
                <div className="text-muted fs-3 text-center py-5">{fetch}</div>
              ) : (
                <>
                  {announcementList.map((list) => (
                    <div className="col-md-6 col-lg-4" key={list._id}>
                      <div className="card h-100 border">
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div>
                            <h6 className="fw-semibold mb-2">{list.title}</h6>
                            <p className="text-muted small mb-3">
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
                            >
                              Delete
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
