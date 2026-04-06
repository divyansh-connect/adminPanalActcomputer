import { apiFetch } from "./api";
const API_URL = import.meta.env.VITE_API_URL;
export const getSeats = async () => {
  const response = await apiFetch(`${API_URL}/api/library/seats`);
  const allSeats = await response.json();
  return allSeats.map(mappingLibrarySeats);
};

export const postAddStudentLibrary = async (addStd) => {
  try {
    const response = await apiFetch(`${API_URL}/api/library/seats/addstudent`, {
      method: "POST",
      body: JSON.stringify(addStd),
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Could Not Add Student",
      };
    }
    return {
      success: true,
      message: data.message || "Student Added Successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Network Error",
    };
  }
};

export const getStudentList = async () => {
  try {
    const response = await apiFetch(`${API_URL}/api/library/lists`);
    const allLists = await response.json();
    return allLists.map(mappingLibraryStdLists);
  } catch (error) {
    throw error;
  }
};

export const getStudent = async (stdId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/library/student/${stdId}`);
    const getStudent = await response.json();
    return mappingLibraryStdLists(getStudent);
  } catch (error) {
    throw error;
  }
};

export const putStudentPay = async (stdId, payload) => {
  try {
    const response = await apiFetch(
      `${API_URL}/api/library/student/pay/${stdId}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Could Not Add Student",
      };
    }
    return {
      success: true,
      message: data.message || "Student Added Successfully",
      data,
    };
  } catch (error) {
    return error;
  }
};

export const putStdEdit = async (stdId, payload) => {
  try {
    const response = await apiFetch(
      `${API_URL}/api/library/student/edit/${stdId}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Could Not Edit Student",
      };
    }
    return {
      success: true,
      message: data.message || "Student Edited Successfully",
      data,
    };
  } catch (error) {
    return error;
  }
};

export const deleteStd = async (stdId) => {
  try {
    const response = await apiFetch(
      `${API_URL}/api/library/student/delete/${stdId}`,
      {
        method: "DELETE",
      },
    );
    const deleteStd = await response.json();
    return deleteStd.message;
  } catch (error) {
    throw new Error("Network Error");
  }
};

const mappingLibrarySeats = (serverSeats) => {
  return {
    id: serverSeats._id,
    seat: serverSeats.seatNumber,
    status: serverSeats.status,
  };
};

const mappingLibraryStdLists = (serverStdLists) => {
  const serverStdListsPayments = serverStdLists.payments[0];
  return {
    id: serverStdLists._id,
    seatId: serverStdLists.seatId,
    name: serverStdLists.name,
    phone: serverStdLists.phone,
    gender: serverStdLists.gender,
    joinDate: serverStdLists.joinDate,
    seat: serverStdLists.seatNumber,
    stdPaymentHistroy: serverStdLists.payments,
    vaildDate: serverStdListsPayments.validTill,
    amount: serverStdListsPayments.amount,
  };
};
