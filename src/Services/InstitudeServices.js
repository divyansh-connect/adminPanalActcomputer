import { apiFetch } from "./api";
const API_URL = import.meta.env.VITE_API_URL;

export const getCourse = async () => {
  try {
    const courseFecth = await apiFetch(`${API_URL}/api/course/`);
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
    const response = await apiFetch(`${API_URL}/api/institude/admission`, {
      method: "POST",
      body: JSON.stringify(stdAdm),
    });
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
    const response = await apiFetch(`${API_URL}/api/institude/students`);
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

export const getInsituteStudent = async (stdId) => {
  try {
    const response = await apiFetch(
      `${API_URL}/api/institude/student/${stdId}`,
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Student not found",
      };
    }
    return {
      success: true,
      message: data.message || "Student fetched successfully",
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
    const response = await apiFetch(`${API_URL}/api/institude/students/fee`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
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

export const getAppPayments = async (sid) => {
  try {
    const response = await apiFetch(`${API_URL}/api/institude/payments/${sid}`);
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Not founded",
      };
    }
    return {
      success: true,
      message: data.message || "Payments fetch successfully",
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
    const response = await apiFetch(`${API_URL}/api/announcement`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

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
    const response = await apiFetch(`${API_URL}/api/announcement/`);
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
    const response = await apiFetch(`${API_URL}/api/announcement/${deleteId}`, {
      method: "DELETE",
    });
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
    const response = await apiFetch(`${API_URL}/api/stdyMaterialFile`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
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
