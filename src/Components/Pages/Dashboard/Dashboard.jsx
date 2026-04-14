import React, { useEffect, useState } from "react";
import DashboardHead from "./DashboardHead";
import DashboardFee from "./DashboardFee";
import DashboardLibrary from "./DashboardLibrary";
import DashboardRightCourse from "./DashboardRightCourse";
import DashboardLeftDown from "./DashboardLeftDown";
import DashboardLeftUp from "./DashboardLeftUp";
import DashboardStaff from "./DashboardStaff";
import { getDashboardCourse } from "../../../Services/dashboard";
import DashboardData from "./DashboardData";

const Dashboard = () => {
  const [fetchData, setFetchData] = useState([]);
  const [thisMonth, setThisMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState("");

  useEffect(() => {
    const fetchCall = async () => {
      try {
        const response = await getDashboardCourse();
        if (!response.success) {
          return setFetchFailed(response.message);
        }
        setFetchData(response.data);
        setLoading(false);
      } catch (error) {
        if (error.message === "Unauthorized") return;
        setFetchFailed(error.message);
      }
    };
    fetchCall();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <DashboardHead fetchData={fetchData} thisMonth={thisMonth} />
        </div>
        <div className="col-12 col-md-5 dashboardRightSection rounded-3 mb-4 shadow py-3">
          <DashboardLeftUp setThisMonth={setThisMonth} />
          <DashboardLeftDown fetchData={fetchData} />
        </div>
        <div className="col-12 col-md-7">
          <DashboardRightCourse fetchData={fetchData} loading={loading} />
        </div>

        <div className="col-12 col-md-4">
          <DashboardLibrary />
        </div>
        <div className="col-12 col-md-8 mb-3 " style={{ height: "52vh" }}>
          <DashboardStaff />
        </div>
        <div className="col-12">
          <DashboardData />
        </div>
        <div className="col-12">
          <DashboardFee fetchData={fetchData} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
