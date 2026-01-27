// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login"; // Vérifiez bien si c'est dans components ou pages
import MotDePasseOublie from "./pages/MotDePasseOublie";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Hotels from "./pages/HotelsList";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {/* --- 1. Redirection de l'accueil vers le Login --- */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* --- 2. Routes Publiques (On ajoute explicitement /login) --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<MotDePasseOublie />} />

      {/* --- 3. Pages protégées (Dashboard) --- */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="hotels" element={<Hotels />} />
      </Route>

      {/* Rediriger tout le reste vers login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;