import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getLoggedVerify } from "../Services/AuthServices";

export const authLoader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/auth/login");
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return redirect("/auth/login");
    }

    const response = await getLoggedVerify(token);
    if (!response.ok) {
      localStorage.removeItem("token");
      return redirect("/auth/login");
    }

    return null;
  } catch (error) {
    localStorage.removeItem("token");
    return redirect("/auth/login");
  }
};
