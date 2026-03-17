import React, { useState } from "react";
import { institudeAnnouncement } from "../../../Services/InstitudeServices";

const AddAnnouncement = ({ setRefresh }) => {
  const [validator, setValidator] = useState({});
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
  });

  const handlePublishBtn = async () => {
    const error = {};
    const cleanAnnouncement = {
      title: announcement.title.trim(),
      description: announcement.description.trim(),
    };

    if (!cleanAnnouncement.title) {
      error.title = "Announcement Title is required";
    }
    if (!cleanAnnouncement.description) {
      error.description = "Announcement Details is required";
    }
    if (Object.keys(error).length > 0) {
      return setValidator(error);
    }
    const payload = {
      title: cleanAnnouncement.title,
      message: cleanAnnouncement.description,
    };

    try {
      // API Calls
      const response = await institudeAnnouncement(payload);
      if (!response.success) {
        return setValidator({ success: response.message });
      }
      setAnnouncement({
        title: "",
        description: "",
      });
      setValidator({ success: response.message });
      setRefresh((prew) => !prew);
    } catch (error) {
      console.log(error.message);

      if (error.message === "Unauthorized") {
        setValidator({ success: "Session expired. Please login again." });
        return;
      }
      if (!error.success) {
        return setValidator({ success: error.message });
      }
    }
  };
  return (
    <>
      {/* Add Announcement Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          {validator.success && (
            <div className="text-danger small text-center">
              {validator.success}
            </div>
          )}
          <h5 className="mb-3">Add New Announcement</h5>

          <div className="row g-2">
            {/* Title */}
            <div className="col-12 ">
              {validator.title && (
                <div className="text-danger small">{validator.title}</div>
              )}
              <input
                type="text"
                className="form-control mb-2"
                placeholder="*Enter announcement title "
                value={announcement.title}
                required
                onChange={(e) => {
                  setAnnouncement({ ...announcement, title: e.target.value });
                }}
              />

              {/* Description */}
              {validator.description && (
                <div className="text-danger small">{validator.description}</div>
              )}
              <textarea
                className="form-control"
                rows="3"
                placeholder="*Write announcement details... "
                value={announcement.description}
                onChange={(e) => {
                  setAnnouncement({
                    ...announcement,
                    description: e.target.value,
                  });
                }}
              ></textarea>
            </div>
            {/* Button */}
            <div className="col-12">
              <button className="btn btn-primary" onClick={handlePublishBtn}>
                Publish Announcement
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAnnouncement;
