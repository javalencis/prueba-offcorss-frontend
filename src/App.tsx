import { useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import "./styles/global.scss";
import { RegisterForm } from "./pages/RegisterForm";
import { LoginForm } from "./pages/LoginForm";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

function App() {
  const isAuthenticated = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Ruta protegida */}
        <Route
          path="/admin/*"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
