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
  const [isAuth, setIsAuth] = useState(null); // null = loading state

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    // If token comes from Google redirect
    if (tokenFromUrl) {
      localStorage.setItem("auth_token", tokenFromUrl);
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("auth_token");

    if (!token) {
      setIsAuth(false);
      return;
    }

    // Verify token with backend
    fetch("https://neoflow-x.onrender.com/auth/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setIsAuth(true);
        } else {
          localStorage.removeItem("auth_token");
          setIsAuth(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
        setIsAuth(false);
      });

  }, []);

  // Loading screen while checking auth
  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={isAuth ? <Layout /> : <Navigate to="/login" />}
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