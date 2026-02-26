import React from "react";

function Navbar() {

  const handleLogout = () => {
    // 1️⃣ Remove JWT from localStorage
    localStorage.removeItem("auth_token");

    // 2️⃣ Optional: clear any other session data
    // localStorage.clear();

    // 3️⃣ Redirect to login
    window.location.href = "/login";
  };

  return (
    <div style={styles.navbar}>
      <h2>NeoFlow X</h2>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    background: "#1e293b",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  logout: {
    background: "#ef4444",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;