import React from "react";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div style={{ padding: "40px", background: "#f5f7fb", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "30px" }}>NeoFlow X Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <DashboardCard title="Tasks Today" value="8" color="#4CAF50" />
        <DashboardCard title="Emails Generated" value="15" color="#2196F3" />
        <DashboardCard title="Meetings Scheduled" value="3" color="#FF9800" />
        <DashboardCard title="Productivity Score" value="92%" color="#9C27B0" />
      </div>
    </div>
  );
}

export default Dashboard;