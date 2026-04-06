import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import StudyMaterialsUpload from "./StudyMaterialsUpload";
import StudyMaterialsUploaded from "./StudyMaterialsUploaded";
import { getStudyMaterial } from "../../../Services/InstitudeServices";
import StudyMaterialsSkeleton from "../Skeleton/StudyMaterialsSkeleton";

const StudyMaterials = () => {
  const [uploadMaterials, setUploadMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState("");

  useEffect(() => {
    const listsCall = async () => {
      setLoading(true);
      try {
        const response = await getStudyMaterial();
        if (!response.success) {
          return;
        }
        setUploadMaterials(response.data);
      } catch (error) {
        if (error.message === "Unauthorized") return;
        return;
      } finally {
        setLoading(false);
      }
    };
    listsCall();
  }, []);

  return (
    <>
      {/* Upload Form */}
      <StudyMaterialsUpload setUploadMaterials={setUploadMaterials} />

      {/* Materials Table */}
      {loading ? (
        <StudyMaterialsSkeleton />
      ) : (
        <StudyMaterialsUploaded
          fetch={fetch}
          uploadMaterials={uploadMaterials}
          setUploadMaterials={setUploadMaterials}
        />
      )}
    </>
  );
};

export default StudyMaterials;
