// src/components/DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* CONTENU JUSTE EN DESSOUS */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
