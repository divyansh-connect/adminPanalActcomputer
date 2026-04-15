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
import DashboardFooter from "./DashboardFooter";

const Dashboard = () => {
  const [fetchData, setFetchData] = useState([]);
  const [thisMonth, setThisMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState("");

  useEffect(() => {
    const fetchCall = async () => {
      setLoading(true);
      try {
        const response = await getDashboardCourse();
        if (!response.success) {
          return setFetchFailed(response.message);
        }
        setFetchData(response.data);
      } catch (error) {
        if (error.message === "Unauthorized") return;
        setFetchFailed(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCall();
  }, []);

  return (
    <>
      <div className="p-1">
        <div className="row">
          <div className="col-12">
            <DashboardHead fetchData={fetchData} thisMonth={thisMonth} />
          </div>
          <div className="col-12 col-md-4">
            <DashboardLibrary />
          </div>
          <div className="d-none d-md-block col-12 col-md-8">
            <DashboardFee fetchData={fetchData} loading={loading} />
          </div>
          <div className="col-12 col-md-5 dashboardRightSection rounded-3 mb-4 shadow py-3">
            <DashboardLeftUp setThisMonth={setThisMonth} />
            <DashboardLeftDown fetchData={fetchData} />
          </div>
          <div className="col-12 col-md-7">
            <DashboardRightCourse fetchData={fetchData} loading={loading} />
          </div>
          <div className="col-12 col-md-4 mb-3" style={{ height: "55vh" }}>
            <DashboardData />
          </div>
          <div className="col-12 col-md-8 mb-3 " style={{ height: "55vh" }}>
            <DashboardStaff />
          </div>
          <div className="col-12">
            <hr />
            <DashboardFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
