import React from "react";
import { Bell, Search, LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Recherche"
            className="pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] bg-yellow-400 text-white rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-9 h-9 rounded-full"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <LogOut className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800 transition" />
      </div>
    </header>
  );
}
