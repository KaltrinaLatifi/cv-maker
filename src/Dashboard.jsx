// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import ChartSection from "./ChartSection";
import { getUsers } from "./api/users";
import { getCVs } from "./api/cvs";
import { getTemplates } from "./api/templates";
import { getMessages } from "./api/contact";

function Dashboard() {
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [animatedStats, setAnimatedStats] = useState({
    totalUsers: 0,
    totalCVs: 0,
    templatesUsed: 0,
    messagesCount: 0,
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("role");
    setIsAdmin(isAuthenticated && role === "admin");
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchStats = async () => {
      try {
        const [users, cvs, templates, messages] = await Promise.all([
          getUsers(),
          getCVs(),
          getTemplates(),
          getMessages(),
        ]);

        const newStats = {
          totalUsers: users.length,
          totalCVs: cvs.length,
          templatesUsed: templates.length,
          messagesCount: messages.length,
        };

        const duration = 1500;
        const start = Date.now();

        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - start) / duration, 1);

          setAnimatedStats({
            totalUsers: Math.floor(progress * newStats.totalUsers),
            totalCVs: Math.floor(progress * newStats.totalCVs),
            templatesUsed: Math.floor(progress * newStats.templatesUsed),
            messagesCount: Math.floor(progress * newStats.messagesCount),
          });

          if (progress < 1) requestAnimationFrame(animate);
        };

        animate();
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, [isAdmin]);

  if (!authReady) return null;
  if (!isAdmin) return <h1>Unauthorized</h1>;

  const cardData = [
    { label: "Total Users", value: animatedStats.totalUsers, icon: "fas fa-users", bg: "bg-primary" },
    { label: "CVs Created", value: animatedStats.totalCVs, icon: "fas fa-file-alt", bg: "bg-success" },
    { label: "Templates Used", value: animatedStats.templatesUsed, icon: "fas fa-paint-brush", bg: "bg-danger" },
    { label: "Messages", value: animatedStats.messagesCount, icon: "fas fa-envelope", bg: "bg-warning" },
  ];

  return (
    <>
      <h1 className="mt-4">Dashboard</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Statistic Cards</li>
      </ol>

      <div className="row">
        {cardData.map((card, idx) => (
          <div key={idx} className="col-xl-3 col-md-6">
            <div className={`card text-white mb-4 ${card.bg}`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5>{card.label}</h5>
                  <h3>{card.value}</h3>
                </div>
                <i className={`${card.icon} fa-2x`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChartSection />
    </>
  );
}

export default Dashboard;
