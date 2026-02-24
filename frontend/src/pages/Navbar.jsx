import { useState } from "react";
import { FaUserCircle, FaChevronDown, FaBars } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode, collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(false);
  const userEmail = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        height: "60px",
        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        
        {/* Toggle Button */}
        <FaBars
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() => setCollapsed(!collapsed)}
        />

        <h2>NeoFlow</h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light" : "Dark"}
        </button>

        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpen(!open)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <FaUserCircle size={24} />
            {!collapsed && <span>{userEmail || "User"}</span>}
            <FaChevronDown size={12} />
          </div>

          {open && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "40px",
                backgroundColor: darkMode ? "#374151" : "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                width: "150px",
                padding: "10px 0",
              }}
            >
              <div style={dropdownItem}>Profile</div>
              <div style={dropdownItem}>Settings</div>
              <div style={dropdownItem} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const dropdownItem = {
  padding: "10px 15px",
  cursor: "pointer",
};

export default Navbar;