import React, { useEffect, useRef, useState } from "react";
import {
  deleteGalleryPhoto,
  uploadGallery,
} from "../../../Services/uploadServices";
import { getGallery } from "../../../Services/InstitudeServices";
import AnnouncementsSkeleton from "../Skeleton/AnnouncementsSkeleton";

const Gallery = () => {
  const [errMsg, setErrMsg] = useState({ isSave: "", isFile: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getGallery()
      .then((fetch) => {
        setImages(fetch.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") return setIsLoading(false);
      });
  }, []);

  const validateFile = (file) => {
    if (!file) {
      return "Please select a file";
    }
    if (!file.type.startsWith("image/")) {
      return "Only image files allowed";
    }
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return "File size should be less than 2MB";
    }
    return null;
  };

  const handleUpload = async (e) => {
    const input = e.target;
    const file = input.files[0];
    const err = validateFile(file);
    if (err) {
      input.value = null;
      setErrMsg((prev) => ({ ...prev, isFile: err }));
      return;
    }
    // API Call
    setIsUploading(true);
    setErrMsg((prev) => ({ ...prev, isSave: "", isFile: "" }));
    try {
      const response = await uploadGallery(file);
      if (!response.success) {
        return setErrMsg((prev) => ({ ...prev, isSave: response.message }));
      }
      setImages((prev) => [...prev, response.data]);
    } catch (error) {
      if (error.message === "Unauthorized") return;
      return setErrMsg((prev) => ({ ...prev, isSave: error.message }));
    } finally {
      setIsUploading(false);
      input.value = null;
    }
  };

  const handleDelete = async (id, url) => {
    const payload = { id, url };
    setIsDelete(id);
    try {
      const response = await deleteGalleryPhoto(payload);
      if (!response.success) {
        return setErrMsg((prev) => ({ ...prev, isSave: response.message }));
      }
      setImages((prev) => prev.filter((photo) => photo._id !== id));
    } catch (error) {
      if (error.message === "Unauthorized")
        return setErrMsg((prev) => ({
          ...prev,
          isSave: "Session expired. Please login again.",
        }));
      return;
    } finally {
      setIsDelete(null);
    }
  };

  return (
    <>
      <div className="p-2">
        <h2 className="text-start">📸 My Gallery</h2>
        {errMsg.isSave && (
          <div className="text-danger text-center small p-2">
            {errMsg.isSave}
          </div>
        )}
        <div className="row py-2 mb-3 d-flex justify-content-center align-items-center">
          {/* Upload Section */}

          <div className="col-10">
            {errMsg.isFile && (
              <div className="text-danger small p-2">{errMsg.isFile}</div>
            )}
            <input
              type="file"
              accept="image/*"
              className="form-control mx-auto"
              onChange={handleUpload}
              disabled={isUploading}
            />
          </div>
          <div className="col-2">
            {isUploading && (
              <div className="">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            )}
          </div>
        </div>
        <hr />

        {/* Gallery Grid */}
        {isLoading ? (
          <AnnouncementsSkeleton />
        ) : (
          <>
            <div className="row">
              {images.length === 0 ? (
                <p className="text-center text-muted">No images uploaded</p>
              ) : (
                <>
                  <h4 className="text-start py-2">Gallery Photos</h4>
                  {images.map((img) => (
                    <div className="col-md-4 mb-4" key={img._id}>
                      <div className="card shadow-sm">
                        <img
                          src={img.fileUrl}
                          alt="gallery"
                          className="card-img-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        />

                        <div className="card-body text-center">
                          <button
                            className="btn btn-danger btn-sm w-100"
                            onClick={() => handleDelete(img._id, img.fileUrl)}
                            disabled={isDelete === img._id}
                          >
                            {isDelete === img._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Gallery;
