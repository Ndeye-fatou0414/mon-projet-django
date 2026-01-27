import React from "react";
import { NavLink } from "react-router-dom";
// Importation des icônes spécifiques
import { LayoutGrid, Monitor } from "lucide-react";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all ${
      isActive 
        ? "bg-white text-black font-bold shadow-md" 
        : "hover:bg-gray-700 text-gray-300"
    }`;

  return (
    <aside className="w-64 bg-[#343a40] text-white h-screen p-5 sticky top-0 flex flex-col shadow-2xl">
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm">
           {/* Forme géométrique pour imiter le logo de l'image */}
           <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#343a40] transform -rotate-45"></div>
        </div>
        <h2 className="text-lg font-bold tracking-wide">RED PRODUCT</h2>
      </div>

      <nav className="flex-1">
        <p className="text-gray-500 text-[10px] uppercase font-bold mb-4 px-2 tracking-widest">
          Principal
        </p>
        
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard" end className={linkClass}>
              <LayoutGrid size={20} strokeWidth={2.5} />
              <span className="text-sm">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/hotels" className={linkClass}>
              <Monitor size={20} strokeWidth={2.5} />
              <span className="text-sm">Liste des hôtels</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="pt-5 border-t border-gray-700 text-[10px] text-gray-500 px-2">
        © 2026 Red Product Admin
      </div>
    </aside>
  );
}