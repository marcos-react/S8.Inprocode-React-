import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register components of Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function ChartContainer() {
  const [chartData, setChartData] = useState([]);

  // Fetch the chart data from the API
  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/chart`)
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  }, []);

  // Process data for pie chart
  const accessData = chartData.reduce(
    (acc, { access_for_disability, percentage }) => {
      if (access_for_disability === "Yes") {
        acc.yes += percentage;
      } else {
        acc.no += percentage;
      }
      return acc;
    },
    { yes: 0, no: 0 }
  );

  // Data pie chart
  const pieChartData = {
    labels: [
      "Disable access for people (Yes)",
      "Disable access for people (No)",
    ],
    datasets: [
      {
        data: [accessData.yes, accessData.no],
        backgroundColor: ["#4CAF50", "#F44336"], // Green and red
      },
    ],
  };

  // Data bar chart
  const barChartData = {
    labels: chartData.map((item) => item.cinema_name),
    datasets: [
      {
        label: "Number of seats",
        data: chartData.map((item) => item.seats),
        backgroundColor: "#2196F3", // Blue
      },
    ],
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Accessibility and Seats Chart
      </h1>

      {/* Accessibility pie chart */}
      <div className="card w-full sm:max-w-md lg:max-w-2xl p-4 shadow-lg mb-6 flex items-center">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Accessibility for Disability
        </h2>
        <div className="w-full sm:w-3/4 lg:w-1/2 max-w-sm mx-auto">
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* Bar chart of seats in cinema */}
      <div className="card w-full sm:max-w-md lg:max-w-2xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Number of Seats per Cinema
        </h2>
        <div className="w-full sm:w-3/4 lg:w-1/2 max-w-sm mx-auto">
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
}
