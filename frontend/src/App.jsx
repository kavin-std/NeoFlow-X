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
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "https://neoflow-x.onrender.com/auth/me",
          {
            credentials: "include", // VERY IMPORTANT
          }
        );

        const data = await res.json();

        if (data.authenticated) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Loading screen while checking auth
  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Area */}
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