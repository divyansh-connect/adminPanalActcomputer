import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import DashboardFeeSkeleton from "../Skeleton/DashboardFeeSkeleton";

const DashboardFee = ({ fetchData, loading }) => {
  return (
    <>
      {loading ? (
        <DashboardFeeSkeleton />
      ) : (
        <>
          <div className="row">
            {fetchData.map((course, indx) => {
              const chartData = {
                labels: [
                  "Admission",
                  "Enrollment",
                  "Sem-1",
                  "Sem-2",
                  "Monthly",
                ],
                datasets: [
                  {
                    label: "My First Dataset",
                    data: [
                      course.courseAdmissionFee,
                      course.courseEnrollment,
                      course.courseExamination / 2,
                      course.courseExamination / 2,
                      course.courseMonthlyFee * 10,
                    ],
                    backgroundColor: [
                      "#3b82f6",
                      "#8b5cf6",
                      "#facc15",
                      "#22c55e",
                      "#fb923c",
                    ],
                    hoverOffset: 4,
                  },
                ],
              };
              const options = {
                cutout: "50%", // donut effect 🔥
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              };

              return (
                <div key={indx} className="col-md-6">
                  <div className="card shadow border-0 p-3 mb-3">
                    <h5 className="text-center mb-3">
                      {course.courseName} Fee Structure
                    </h5>
                    <Doughnut data={chartData} options={options} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default DashboardFee;
