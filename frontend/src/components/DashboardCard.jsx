import React from "react";

function DashboardCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "14px",
        width: "230px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${color}`,
        fontFamily: "Arial",
      }}
    >
      <h3 style={{ margin: 0, color: "#555" }}>{title}</h3>

      <h1
        style={{
          marginTop: "10px",
          marginBottom: "0",
          color: "#111",
          fontSize: "32px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;