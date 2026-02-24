import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", email); // ✅ store user email
      navigate("/");
    } else {
      alert("Enter email and password");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Login to NeoFlow</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />
        <button onClick={handleLogin} style={button}>
          Login
        </button>
      </div>
    </div>
  );
};

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3f4f6",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const button = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

export default Login;