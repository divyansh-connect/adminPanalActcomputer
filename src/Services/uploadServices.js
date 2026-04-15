import { apiFetch } from "./api";
const API_URL = import.meta.env.VITE_API_URL;

export const stdAdmUpload = async (uploadFile) => {
  try {
    const formData = new FormData();

    formData.append("stdAdmPhoto", uploadFile);
    const uploaded = await apiFetch(`${API_URL}/api/upload/stdAdmPhoto`, {
      method: "POST",
      body: formData,
    });

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
    formData.append("courses", file.courses);
    formData.append("title", file.title);
    formData.append("stdyMaterialFile", file.upload);

    const response = await apiFetch(
      `${API_URL}/api/upload/stdyMaterialFileUpload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to upload file",
      };
    }
    return {
      success: true,
      message: data.message || "Upload successfully",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Server failed",
    };
  }
};

export const uploadStdDoc = async (uploadFile) => {
  try {
    const formData = new FormData();

    formData.append("studentId", uploadFile.studentId);
    formData.append("fileType", uploadFile.type);
    formData.append("stdDocumentFile", uploadFile.file);

    const response = await apiFetch(`${API_URL}/api/upload/stdDocument`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Document upload failed",
      };
    }
    return {
      success: true,
      message: data.message || "Document uploaded successfully",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Server failed",
    };
  }
};

export const deleteStdyMaterialFile = async (payload) => {
  try {
    const response = await apiFetch(
      `${API_URL}/api/upload/deleteStudyMaterial`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Study material delete failed",
      };
    }
    return {
      success: true,
      message: data.message || "Study material delete successfully",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Server failed",
    };
  }
};

export const uploadGallery = async (file) => {
  try {
    const formData = new FormData();
    formData.append("galleryPhoto", file);
    const response = await apiFetch(`${API_URL}/api/upload/gallery`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Gallery photo upload failed",
      };
    }
    return {
      success: true,
      message: data.message || "Gallery photo uploaded successfully",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Server failed",
    };
  }
};

export const deleteGalleryPhoto = async (payload) => {
  try {
    const response = await apiFetch(
      `${API_URL}/api/upload/deleteGalleryPhoto`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Gallery photo delete failed",
      };
    }
    return {
      success: true,
      message: data.message || "Gallery Photo deleted successfully",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Server failed",
    };
  }
};
