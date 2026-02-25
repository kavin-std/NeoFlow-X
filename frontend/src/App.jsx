import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("token") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

        {/* Protected Area */}
        <Route
          path="/"
          element={isAuth ? <Layout /> : <Navigate to="/login" />}
        >
          {/* Home */}
          <Route index element={<Dashboard />} />

          {/* Other Pages */}
          <Route path="calendar" element={<Calendar />} />
          <Route path="tasks" element={<Tasks />} />

          {/* MAILS SECTION */}
          <Route path="mails" element={<Mails />} />
          <Route path="mail" element={<Mail />} />

          {/* Assistant */}
          <Route path="assistant" element={<Assistant />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;