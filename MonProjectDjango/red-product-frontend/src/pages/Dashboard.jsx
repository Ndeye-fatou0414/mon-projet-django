import React from "react";
import { Mail, Users, Hotel, LayoutDashboard, Database } from "lucide-react";

export default function Dashboard() {
  // 1. On récupère le nom stocké dans le localStorage lors du login
  const nomUtilisateur = localStorage.getItem("user_nom") || "Utilisateur";

  return (
    <div className="flex flex-col">
      
      {/* BANDE BLANCHE DYNAMIQUE */}
      <div className="bg-white h-20 flex flex-col justify-center px-6 mt-1 shadow w-full">
        <h1 className="text-xl font-bold text-gray-800">
          Bienvenue sur Red Product, {nomUtilisateur}
        </h1>
        <p className="text-sm text-gray-500">
          Votre solution simple pour gérer vos produits et établissements
        </p>
      </div>

      {/* CONTENU */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1 - Formulaires */}
          <div className="bg-white p-6 rounded shadow flex items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-400">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center ml-4">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-800">125</p>
                <p className="text-sm text-gray-500">Formulaires</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">Total des formulaires reçus</p>
            </div>
          </div>

          {/* CARD 2 - Messages */}
          <div className="bg-white p-6 rounded shadow flex items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-600">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center ml-4">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-800">40</p>
                <p className="text-sm text-gray-500">Messages</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">Nouveaux messages non lus</p>
            </div>
          </div>

          {/* CARD 3 - Utilisateurs */}
          <div className="bg-white p-6 rounded shadow flex items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-400">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center ml-4">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-800">600</p>
                <p className="text-sm text-gray-500">Utilisateurs</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">Utilisateurs actifs inscrits</p>
            </div>
          </div>

          {/* CARD 4 - E-mails */}
          <div className="bg-white p-6 rounded shadow flex items-center">
             <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center ml-4">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-800">25</p>
                <p className="text-sm text-gray-500">E-mails</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">Campagnes envoyées ce mois</p>
            </div>
          </div>

          {/* CARD 5 - Hôtels */}
          <div className="bg-white p-6 rounded shadow flex items-center">
             <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-600">
               <Hotel className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center ml-4">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-800">40</p>
                <p className="text-sm text-gray-500">Hôtels</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">Établissements partenaires</p>
            </div>
          </div>

          {/* CARD 6 - Entités */}
          <div className="bg-white p-6 rounded shadow flex items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-600">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center ml-4">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-800">02</p>
                <p className="text-sm text-gray-500">Entités</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">Groupes administratifs</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}