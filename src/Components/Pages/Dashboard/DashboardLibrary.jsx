import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { getSeats } from "../../../Services/LibraryServices";
import { Link } from "react-router-dom";

const DashboardLibrary = () => {
  const [data, setData] = useState({
    totalSeats: 0,
    occupiedSeats: 0,
    availableSeats: 0,
  });

  useEffect(() => {
    getSeats()
      .then((seats) => {
        const getData = seats.reduce(
          (sum, seat) => {
            if (seat.id) sum.totalSeats++;
            if (seat.status === "occupied") sum.occupiedSeats++;
            if (seat.status === "available") sum.availableSeats++;
            return sum;
          },
          {
            totalSeats: 0,
            occupiedSeats: 0,
            availableSeats: 0,
          },
        );
        setData({
          totalSeats: getData.totalSeats,
          occupiedSeats: getData.occupiedSeats,
          availableSeats: getData.availableSeats,
        });
      })
      .catch((error) => {});
  }, []);

  const chartData = {
    labels: [
      `Total (${data.totalSeats})`,
      `Occupied (${data.occupiedSeats})`,
      `Available (${data.availableSeats})`,
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [0, data.occupiedSeats, data.availableSeats],
        backgroundColor: [
          "rgb(235, 184, 54)",
          "rgb(251, 76, 114)",
          "rgb(54, 235, 75)",
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
    <div className="card shadow border-0 p-3 mb-3">
      <h5 className="text-center mb-3">Library Seat Status</h5>
      <Link to={"/library/seats"}>
        <Doughnut data={chartData} options={options} />
      </Link>
    </div>
  );
};

export default DashboardLibrary;
