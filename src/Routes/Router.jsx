import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../Components/Layout/AdminLayout";
import SeatsGrid from "../Components/Pages/LibraryPages/SeatsGrid";
import StudyMaterials from "../Components/Pages/StudyMaterialsShow.jsx/StudyMaterials";
import Announcements from "../Components/Pages/Announcements/Announcements";
import Error404 from "../Components/Pages/Error/Error";
import AddStudentFrom from "../Components/Pages/LibraryPages/AddStudentFrom";
import StudentsList from "../Components/Pages/LibraryPages/StudentList";
import StudentDetails from "../Components/Pages/LibraryPages/StudentDetalis";
import StudentDetailsEditing from "../Components/Pages/LibraryPages/StudentDetalis/StudentDetailsEditing";
import Login from "../Components/Pages/Auth/Login";
import { authLoader } from "../Routes/authLoader";
import StdAdmission from "../Components/Pages/Actcomputer/StdAdmission";
import StudentList from "../Components/Pages/Actcomputer/StudentList";
import StudentView from "../Components/Pages/Actcomputer/StudentViewPages/StudentView";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/library", element: <StudentsList /> },
      { path: "/library/student/:stdId", element: <StudentDetails /> },
      {
        path: "/library/student/edit/:stdId",
        element: <StudentDetailsEditing />,
      },
      { path: "/library/seats", element: <SeatsGrid /> },
      {
        path: "/library/seats/add-student/:id/:seatNo",
        element: <AddStudentFrom />,
      },
    ],
    loader: authLoader,
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      // { index: true, element: <Dashboard /> },
      { path: "/studymaterials", element: <StudyMaterials /> },
      { path: "/students", element: <StudentList /> },
      { path: "/students/:stdId", element: <StudentView /> },
      { path: "/announcements", element: <Announcements /> },
      { path: "/admissions", element: <StdAdmission /> },
    ],
    loader: authLoader,
  },
  { path: "/auth/login", element: <Login /> },
  { path: "*", element: <Error404 /> },
]);
