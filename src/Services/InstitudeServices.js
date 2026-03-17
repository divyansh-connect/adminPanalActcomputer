import { apiFetch } from "./api";

export const getCourse = async () => {
  try {
    const courseFecth = await apiFetch(
      `https://actcomputer.onrender.com/api/course/`,
    );
    const data = await courseFecth.json();
    if (!courseFecth.ok) {
      throw new Error({ message: data.message || "course not founded" });
    }
    return data.data || [];
  } catch (error) {
    if (error.message === "Unauthorized") {
      throw error;
    }
    throw error;
  }
};

export const stdAdmSubmitting = async (stdAdm) => {
  try {
    const response = await apiFetch(
      `https://actcomputer.onrender.com/api/institude/admission`,
      {
        method: "POST",
        body: JSON.stringify(stdAdm),
      },
    );
    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Student admission failed",
      };
    }
    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") {
      throw error;
    }
    return {
      success: false,
      message: "Network error",
    };
  }
};

export const getAllStudents = async () => {
  try {
    const response = await apiFetch(
      `https://actcomputer.onrender.com/api/institude/students`,
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "unable to fetch student",
      };
    }
    return {
      success: true,
      message: data.message || "all students available",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};

export const payStdFee = async (payload) => {
  try {
    const response = await apiFetch(
      `https://actcomputer.onrender.com/api/institude/students/fee`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Fee submit failed",
      };
    }
    return {
      success: true,
      message: data.message || "Student Fee submitted successfully",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};

export const institudeAnnouncement = async (payload) => {
  try {
    const response = await apiFetch(
      `https://actcomputer.onrender.com/api/announcement`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Announcement upload failed",
      };
    }
    return {
      success: true,
      message: data.message || "Announcement uploaded",
      data,
    };
  } catch (error) {
    if ((error.message = "Unauthorized")) {
      throw error;
    }
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};

export const getinstituteAnnouncement = async () => {
  try {
    const response = await apiFetch(
      `https://actcomputer.onrender.com/api/announcement/`,
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Announcement find failed",
      };
    }
    return {
      success: true,
      message: data.message || "Announcement find",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") {
      throw error;
    }
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};

export const deleteInstituteAnnouncement = async (deleteId) => {
  try {
    const response = await apiFetch(
      `https://actcomputer.onrender.com/api/announcement/${deleteId}`,
      {
        method: "DELETE",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Delete failed",
      };
    }
    return {
      success: true,
      message: data.message || "Deleted successfully",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") {
      throw error;
    }
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};

export const uploadStudyMaterial = async (payload) => {
  try {
    const response = await apiFetch(
      `https://actcomputer.onrender.com/api/stdyMaterialFile`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Study material upload failed ",
      };
    }
    return {
      success: true,
      message: data.message || "Study material upload successfully",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") {
      throw error;
    }
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};
