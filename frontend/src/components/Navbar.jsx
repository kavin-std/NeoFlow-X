import React, { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    fetch("https://neoflow-x.onrender.com/auth/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  };

  return (
    <div style={styles.navbar}>
      <h2>NeoFlow X</h2>

      <div style={styles.rightSection}>
        {user && (
          <>
            <img
              src={user.picture}
              alt="profile"
              style={styles.avatar}
            />
            <span style={styles.name}>{user.name}</span>
          </>
        )}

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
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
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
  },
  name: {
    fontSize: "14px",
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