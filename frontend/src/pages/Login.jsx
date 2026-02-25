import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // simple demo login
    if (username && password) {
      localStorage.setItem("token", "true");
      setIsAuth(true);
      navigate("/");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b1a2f",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          width: "300px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;