import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../Components/Layout/AdminLayout";
import Error404 from "../Components/Pages/Error/Error";
import Login from "../Components/Pages/Auth/Login";
import { authLoader } from "../Routes/authLoader";
import { roleLoader } from "./roleLoader";
import Unauthorized from "../Components/Pages/Error/Unauthorized";
import { routesConfig } from "./routesConfig";
import SignUp from "../Components/Pages/Auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    loader: authLoader,
    children: routesConfig.map((routes) => ({
      path: routes.path,
      element: <routes.element />,
      loader: roleLoader(routes.roles),
    })),
  },
  {
    path: "/",
    element: <AdminLayout />,
    loader: authLoader,
    children: [{ path: "/unauthorized", element: <Unauthorized /> }],
  },
  { path: "/auth/signUp", element: <SignUp /> },
  { path: "/auth/login", element: <Login /> },
  {
    path: "/",
    element: <AdminLayout />,
    loader: authLoader,
    children: [{ path: "*", element: <Error404 /> }],
  },
]);
