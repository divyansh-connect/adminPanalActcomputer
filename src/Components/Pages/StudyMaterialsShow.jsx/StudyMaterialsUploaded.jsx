import React from "react";

const StudyMaterialsUploaded = ({ uploadMaterials }) => {
  const formatDate = (decodeDate) => {
    const date = new Date(decodeDate);
    return date.toLocaleDateString();
  };

  return (
    <div className="card shadow-sm ">
      <div className="card-body">
        <h5 className="mb-3">Uploaded Materials</h5>

        <div className="table-responsive studyMaterialShow">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th className="tableCourse">Course</th>
                <th className="tableTitle">Title</th>
                <th className="tableDate">Date</th>
                <th className="tableAction">Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadMaterials.map((uploadMaterial) => (
                <tr key={uploadMaterial.date}>
                  <td className="tableCourse">{uploadMaterial.course}</td>
                  <td className="tableTitle">{uploadMaterial.title}</td>
                  <td className="tableDate">
                    {formatDate(uploadMaterial.date)}
                  </td>
                  <td className="tableAction text-center">
                    <div className="d-flex w-100 justify-content-center gap-1">
                      <button className="btn btn-warning action-btn w-100">
                        Edit
                      </button>
                      <button className="btn btn-danger action-btn w-100">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsUploaded;
