import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "230px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Segoe UI, Arial, sans-serif"   // 🔥 forces same font everywhere
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

        <NavLink to="/mails" style={linkStyle}>
          Mails
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
  fontFamily: "inherit",
  fontSize: "15px",
  display: "block"
});

export default Sidebar;