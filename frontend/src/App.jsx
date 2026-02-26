import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Mail from "./pages/Mail";
import Mails from "./pages/Mails";
import Assistant from "./pages/Assistant";
import Settings from "./pages/Settings";

function App() {
  const [isAuth, setIsAuth] = useState(null); // null = loading

  useEffect(() => {
    const initializeAuth = async () => {
      // 1️⃣ Check if token came from Google redirect
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");

      if (tokenFromUrl) {
        localStorage.setItem("auth_token", tokenFromUrl);
        window.history.replaceState({}, document.title, "/");
      }

      // 2️⃣ Get stored token
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        const res = await fetch(
          "https://neoflow-x.onrender.com/auth/me",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await res.json();

        if (data.authenticated) {
          setIsAuth(true);
        } else {
          localStorage.removeItem("auth_token");
          setIsAuth(false);
        }
      } catch (error) {
        localStorage.removeItem("auth_token");
        setIsAuth(false);
      }
    };

    initializeAuth();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            isAuth ? <Navigate to="/" replace /> : <Login />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuth ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="mails" element={<Mails />} />
          <Route path="mail" element={<Mail />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;