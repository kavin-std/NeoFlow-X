import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Mail from "./pages/Mail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";






function App() {
  // 🔥 Load saved theme from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // 🔥 Save theme when it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Dashboard darkMode={darkMode} />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Calendar */}
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Calendar />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Tasks */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Tasks darkMode={darkMode} />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Mail */}
      <Route
        path="/mail"
        element={
          <ProtectedRoute>
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Mail />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 404 Route - MUST BE LAST */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <NotFound darkMode={darkMode} />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;