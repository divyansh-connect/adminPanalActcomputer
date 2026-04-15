import React, { useState } from "react";
import { deleteStdyMaterialFile } from "../../../Services/uploadServices";

const StudyMaterialsUploaded = ({ uploadMaterials, setUploadMaterials }) => {
  const [isDelete, setIsDelete] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const formatDate = (decodeDate) => {
    const date = new Date(decodeDate);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDeleteStdyMaterial = async (id, url) => {
    const payload = { id, url };
    setIsDelete(id);
    try {
      const response = await deleteStdyMaterialFile(payload);
      if (!response.success) {
        return setErrMsg(response.message || "Study material delete failed");
      }
      setUploadMaterials((prev) => prev.filter((list) => list._id !== id));
    } catch (error) {
      if (error.message === "Unauthorized")
        return setErrMsg("Session expired. Please login again.");
      return;
    } finally {
      setIsDelete(null);
    }
  };
  return (
    <>
      {uploadMaterials?.length > 0 ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Uploaded Materials</h5>
            <p className="text-danger small text-center">{errMsg}</p>
            {/* Desktop */}
            <div className="d-none d-md-block studyMaterialScroll">
              {/* Header */}
              <div className="row fw-semibold border-bottom pb-2 mb-2 ">
                <div className="col-md-2">Course</div>
                <div className="col-md-4">Title</div>
                <div className="col-md-3">Date</div>
                <div className="col-md-3 text-center">Actions</div>
              </div>

              {/* Data */}
              {uploadMaterials?.map((item) => (
                <div
                  key={item._id}
                  className="row align-items-center py-2 border-bottom"
                >
                  <div className="col-md-2">{item.course}</div>
                  <div className="col-md-4 ">{item.title}</div>
                  <div className="col-md-3 text-muted">
                    {formatDate(item.createdAt)}
                  </div>
                  <div className="col-md-3 hstack gap-2">
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary btn-sm w-100"
                    >
                      View
                    </a>

                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() =>
                        handleDeleteStdyMaterial(item._id, item.fileUrl)
                      }
                      disabled={isDelete === item._id}
                    >
                      {isDelete === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Phones/Tables */}
            <div className="d-block d-md-none studyMaterialScroll ">
              {uploadMaterials?.map((item) => (
                <div key={item._id} className="card mb-1 shadow-sm border-2">
                  <div className="card-body">
                    <div className="hstack gap-2">
                      <strong className="me-auto">{item.course}</strong>
                      <span className="text-primary fw-semibold">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-muted mb-2">{item.title}</p>
                    <div className="hstack gap-2 small ">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        View
                      </a>

                      <button
                        className="btn btn-outline-danger btn-sm w-100"
                        onClick={() =>
                          handleDeleteStdyMaterial(item._id, item.fileUrl)
                        }
                        disabled={isDelete === item._id}
                      >
                        {isDelete === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <h5>No Study Material Found</h5>
          <p>Upload new study material to get started</p>
        </div>
      )}
    </>
  );
};

export default StudyMaterialsUploaded;
