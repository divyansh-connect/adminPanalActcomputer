import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useNavigation } from "react-router-dom";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      <div className="admin-wrapper d-flex">
        {/* Sidebar */}
        <div className={`sidebar ${isOpen ? "active" : ""}`}>
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        {/* Overlay (Mobile Only) */}
        {isOpen && <div className="overlay" onClick={closeSidebar}></div>}

        {/* Main Content */}
        <div className="flex-grow-1 bg-light main-content">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="content-area p-2 p-lg-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
