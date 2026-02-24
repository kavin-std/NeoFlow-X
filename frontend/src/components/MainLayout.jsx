import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children, darkMode, setDarkMode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar
        darkMode={darkMode}
        collapsed={collapsed}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: darkMode ? "#111827" : "#f9fafb",
          }}
        >
          {children}
        </div>

      </div>
    </div>
  );
};

export default MainLayout;