import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>NeoFlow X</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

        <NavLink to="/" end style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/calendar" style={linkStyle}>
          Calendar
        </NavLink>

        <NavLink to="/tasks" style={linkStyle}>
          Tasks
        </NavLink>

        <NavLink to="/mail" style={linkStyle}>
          Mail Generator
        </NavLink>

        <NavLink to="/assistant" style={linkStyle}>
          NeoFlow Assistant
        </NavLink>

        <NavLink to="/settings" style={linkStyle}>
          Settings
        </NavLink>

      </nav>
    </div>
  );
};

const linkStyle = ({ isActive }) => ({
  color: "white",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "8px",
  background: isActive ? "#2563eb" : "transparent",
  transition: "0.2s",
});

export default Sidebar;