import React from "react";
import { useRef } from "react";
import { useState } from "react";
import StudyMaterialsUpload from "./StudyMaterialsUpload";
import StudyMaterialsUploaded from "./StudyMaterialsUploaded";

const StudyMaterials = () => {
  const [uploadMaterials, setUploadMaterials] = useState([]);

  return (
    <>
      <h3 className="mb-4">Manage Study Materials</h3>

      {/* Upload Form */}
      <StudyMaterialsUpload
        uploadMaterials={uploadMaterials}
        setUploadMaterials={setUploadMaterials}
      ></StudyMaterialsUpload>

      {/* Materials Table */}
      {uploadMaterials.length === 0 ? (
        ""
      ) : (
        <StudyMaterialsUploaded
          uploadMaterials={uploadMaterials}
        ></StudyMaterialsUploaded>
      )}
    </>
  );
};

export default StudyMaterials;
