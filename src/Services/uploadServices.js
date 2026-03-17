import { apiFetch } from "./api";

export const stdAdmUpload = async (uploadFile) => {
  try {
    const formData = new FormData();

    formData.append("stdAdmPhoto", uploadFile);
    const uploaded = await apiFetch(
      "https://actcomputer.onrender.com/api/upload/stdAdmPhoto",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await uploaded.json();

    if (!uploaded.ok) {
      throw new Error(data.message || "Upload failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadStudyMaterialFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("stdyMaterialFile", file);
    console.log(file);

    const uploaded = await apiFetch(
      "https://actcomputer.onrender.com/api/upload/stdyMaterialFile",
      {
        method: "POST",
        body: formData,
      },
    );
    const data = uploaded.json();
    if (!uploaded.ok) {
      return {
        success: false,
        message: error.message || "Failed to upload file",
      };
    }
    return data.url;
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Server failed",
    };
  }
};
