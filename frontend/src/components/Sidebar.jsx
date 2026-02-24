import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaTasks,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";

const Sidebar = ({ darkMode, collapsed }) => {
  const pendingTasks = 5;
  const unreadMails = 3;

  return (
    <div style={sidebarStyle(darkMode, collapsed)}>
      
      <NavLink to="/" style={({ isActive }) => linkStyle(isActive, darkMode)}>
        <FaTachometerAlt />
        {!collapsed && "Dashboard"}
      </NavLink>

      <NavLink to="/calendar" style={({ isActive }) => linkStyle(isActive, darkMode)}>
        <FaCalendarAlt />
        {!collapsed && "Calendar"}
      </NavLink>

      <NavLink to="/tasks" style={({ isActive }) => linkStyle(isActive, darkMode)}>
        <div style={iconWrapper}>
          <FaTasks />
          {pendingTasks > 0 && <span style={badge}>{pendingTasks}</span>}
        </div>
        {!collapsed && "Tasks"}
      </NavLink>

      <NavLink to="/mail" style={({ isActive }) => linkStyle(isActive, darkMode)}>
        <div style={iconWrapper}>
          <FaEnvelope />
          {unreadMails > 0 && <span style={badge}>{unreadMails}</span>}
        </div>
        {!collapsed && "Mail"}
      </NavLink>

      <NavLink to="/settings" style={({ isActive }) => linkStyle(isActive, darkMode)}>
        <FaCog />
        {!collapsed && "Settings"}
      </NavLink>

    </div>
  );
};

const sidebarStyle = (darkMode, collapsed) => ({
  width: collapsed ? "70px" : "220px",
  padding: "20px",
  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
  borderRight: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  transition: "0.3s",
});

const linkStyle = (isActive, darkMode) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "8px",
  fontWeight: isActive ? "bold" : "500",
  backgroundColor: isActive ? "#2563eb" : "transparent",
  color: isActive
    ? "#ffffff"
    : darkMode
    ? "#e5e7eb"
    : "#111827",
  position: "relative",
});

const iconWrapper = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const badge = {
  position: "absolute",
  top: "-6px",
  right: "-10px",
  backgroundColor: "red",
  color: "white",
  borderRadius: "50%",
  fontSize: "10px",
  padding: "3px 6px",
};

export default Sidebar;