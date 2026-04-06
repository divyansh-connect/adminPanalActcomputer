import React, { useState } from "react";
import { putMarkDocument } from "../../../../Services/InstitudeServices";

const StudentDocument = ({ documents, setStdDoc }) => {
  const [isupload, setIsupload] = useState(null);
  const [error, setError] = useState(null);
  const handleMark = async (docId) => {
    setIsupload(docId);
    try {
      const response = await putMarkDocument(docId);
      if (!response.success) {
        setError({ id: docId, message: response.message });
        setIsupload(null);
        return;
      }
      setStdDoc((prew) =>
        prew.map((doc) =>
          doc._id === response.data._id ? response.data : doc,
        ),
      );
      setError({ id: docId, message: response.message });
      setIsupload(null);
    } catch (error) {
      if (error.message === "Unauthorized") return;
      setError({ id: docId, message: error.message });
    }
  };

  return (
    <>
      <div className="card shadow-sm my-3 ">
        {/* Header */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📂 Documents</h5>
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="row">
            {documents.length > 0 ? (
              <>
                {documents.map((doc) => (
                  <div className="col-lg-4 mb-3" key={doc?._id}>
                    <div className="card h-100 border">
                      <div className="card-body d-flex flex-column justify-content-between">
                        {/* Top Info */}
                        <div>
                          <h6 className="fw-bold">
                            {doc?.fileType.toUpperCase()}
                          </h6>
                          <p className="mb-1 text-muted">
                            Uploaded:{" "}
                            {new Date(doc?.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>

                          {/* Status */}
                          {doc.isIssued ? (
                            <span className="badge bg-success">
                              Issued{" "}
                              <span>
                                (
                                {new Date(doc?.isIssuedDate).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                                )
                              </span>
                            </span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              Not Issued
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="d-none d-lg-block">
                          <div className="mt-3 d-flex gap-2 ">
                            <button className="btn btn-outline-primary btn-sm">
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                className="text-decoration-none"
                              >
                                View
                              </a>
                            </button>

                            {!doc.isIssued && (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleMark(doc._id)}
                                disabled={isupload === doc._id}
                              >
                                {isupload === doc._id
                                  ? "Updating..."
                                  : "Mark Issued"}
                              </button>
                            )}
                          </div>
                          {error?.id === doc._id && (
                            <div className="text-danger small text-center">
                              {error.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="d-flex flex-column align-items-center justify-content-center py-2 border rounded bg-light">
                  <i className="bi bi-folder-x fs-1 text-secondary"></i>
                  <p className="mt-3 mb-1 fw-semibold">No Documents Uploaded</p>
                  <small className="text-muted">
                    Upload documents to see them here
                  </small>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDocument;
