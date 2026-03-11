import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getUsers } from "./api/users";

const ChartSection = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!users.length || !chartRef.current) return;

    // Count users per month
    const monthCounts = Array(12).fill(0);
    users.forEach((u) => {
      if (u.createdAt) {
        const month = new Date(u.createdAt).getMonth();
        monthCounts[month]++;
      }
    });

    // Destroy previous instance (important in React)
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          {
            label: "New Users per Month",
            data: monthCounts,
            fill: true,
            backgroundColor: "rgba(78, 115, 223, 0.2)",
            borderColor: "rgba(78, 115, 223, 1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // lets it fill the container height
        plugins: {
          legend: { display: true },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [users]);

  return (
    <div
      className="card mb-4"
      style={{
        width: "100%",
        flex: 1,          
        minHeight: 260,   
        overflow: "hidden"
      }}
    >
      <div className="card-header">
        <i className="fas fa-chart-area me-1"></i> User Registrations per Month
      </div>

      <div
        className="card-body"
        style={{
          height: "100%",   
          minHeight: 0      
        }}
      >
        <div style={{ position: "relative", height: "100%", minHeight: 0 }}>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
