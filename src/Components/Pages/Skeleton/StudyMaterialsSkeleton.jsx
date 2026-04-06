import React from "react";

const StudyMaterialsSkeleton = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <p className="placeholder-glow">
          <span className="placeholder col-3 rounded-3 p-3"></span>
        </p>
        <div className="placeholder-glow">
          {/* StudyMaterials List */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="placeholder my-1 rounded col-12 p-3">
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsSkeleton;
