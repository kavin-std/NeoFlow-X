import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Mail from "./pages/Mail";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import Assistant from "./pages/Assistant";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("token") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} />}
        />

        {/* Protected Layout */}
        <Route
          path="/"
          element={
            isAuth ? (
              <Layout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          {/* Dashboard (Home) */}
          <Route index element={<Dashboard />} />

          {/* Other Pages */}
          <Route path="calendar" element={<Calendar />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="mail" element={<Mail />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;