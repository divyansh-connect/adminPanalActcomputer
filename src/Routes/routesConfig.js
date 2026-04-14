import Gallery from "../Components/Pages/Actcomputer/Gallery";
import StdAdmission from "../Components/Pages/Actcomputer/StdAdmission";
import StudentList from "../Components/Pages/Actcomputer/StudentList";
import StudentView from "../Components/Pages/Actcomputer/StudentViewPages/StudentView";
import Announcements from "../Components/Pages/Announcements/Announcements";
import SignUp from "../Components/Pages/Auth/SignUp";
import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import HomePage from "../Components/Pages/HomePage";
import AddStudentFrom from "../Components/Pages/LibraryPages/AddStudentFrom";
import SeatsGrid from "../Components/Pages/LibraryPages/SeatsGrid";
import StudentDetails from "../Components/Pages/LibraryPages/StudentDetalis";
import StudentDetailsEditing from "../Components/Pages/LibraryPages/StudentDetalis/StudentDetailsEditing";
import StudentsList from "../Components/Pages/LibraryPages/StudentList";
import StudyMaterials from "../Components/Pages/StudyMaterialsShow.jsx/StudyMaterials";

export const routesConfig = [
  {
    path: "/",
    element: HomePage,
    roles: ["head", "admin", "staff"],
  },
  {
    path: "dashboard",
    name: "📊 Dashboard",
    element: Dashboard,
    roles: ["head"],
  },
  {
    path: "dashboard/signup",
    element: SignUp,
    roles: ["head"],
  },
  {
    path: "library",
    name: "📚 Library",
    element: StudentsList,
    roles: ["head", "admin"],
  },

  {
    path: "library/student/:stdId",
    element: StudentDetails,
    roles: ["head", "admin"],
  },
  {
    path: "library/student/edit/:stdId",
    element: StudentDetailsEditing,
    roles: ["head", "admin"],
  },
  { path: "library/seats", element: SeatsGrid, roles: ["head", "admin"] },
  {
    path: "library/seats/add-student/:id/:seatNo",
    element: AddStudentFrom,
    roles: ["head", "admin"],
  },
  {
    path: "gallery",
    name: "🖼️ Gallery",
    element: Gallery,
    roles: ["head", "admin", "staff"],
  },
  {
    path: "admissions",
    name: "📝 New Admission",
    element: StdAdmission,
    roles: ["head", "admin", "staff"],
  },
  {
    path: "students",
    name: "👨‍🎓 Students",
    element: StudentList,
    roles: ["head", "admin", "staff"],
  },
  {
    path: "students/:stdId",
    element: StudentView,
    roles: ["head", "admin", "staff"],
  },
  {
    path: "studymaterials",
    name: "📂 Study Materials",
    element: StudyMaterials,
    roles: ["head", "admin", "staff"],
  },
  {
    path: "announcements",
    name: "📢 Announcements",
    element: Announcements,
    roles: ["head", "admin", "staff"],
  },
];
