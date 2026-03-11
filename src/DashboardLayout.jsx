// src/DashboardLayout.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell d-flex flex-column">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="admin-body d-flex flex-grow-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="admin-main flex-grow-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

