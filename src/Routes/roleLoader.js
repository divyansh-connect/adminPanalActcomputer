import { redirect } from "react-router-dom";
import { getUserRole } from "../utils/authRole";

export const roleLoader = (roles) => {
  return () => {
    const user = getUserRole();
    if (!user) return redirect("/auth/login");
    if (!roles.includes(user.role)) {
      return redirect("/unauthorized");
    }
    return null;
  };
};
