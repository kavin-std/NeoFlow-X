import React from "react";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://neoflow-x.onrender.com/auth/google";
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "#0b1a2f",
      color: "white"
    }}>
      <h1>NeoFlow X</h1>
      <button
        onClick={handleGoogleLogin}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;