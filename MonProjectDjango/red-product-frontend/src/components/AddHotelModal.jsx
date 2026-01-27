import React from "react";

const AddHotelModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        
        {/* Header avec bouton retour */}
        <div className="p-4 flex items-center gap-4 border-b border-dotted border-gray-300">
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h3 className="uppercase font-bold text-gray-700 text-sm tracking-wide">
            Créer un nouveau hôtel
          </h3>
        </div>

        {/* Formulaire */}
        <form className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Nom de l'hôtel</label>
              <input type="text" placeholder="CAP Marniane" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-1 focus:ring-gray-400 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Adresse</label>
              <input type="text" placeholder="Les îles du saloum, Mar Lodj" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-1 focus:ring-gray-400 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">E-mail</label>
              <input type="email" placeholder="information@gmail.com" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-1 focus:ring-gray-400 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Numéro de téléphone</label>
              <input type="text" placeholder="+221 77 777 77 77" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-1 focus:ring-gray-400 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Prix par nuit</label>
              <input type="text" placeholder="25.000 XOF" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-1 focus:ring-gray-400 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Devise</label>
              <select className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-1 focus:ring-gray-400 text-sm bg-white">
                <option>F XOF</option>
              </select>
            </div>
          </div>

          <div className="mt-8 space-y-1">
            <label className="text-sm font-medium text-gray-600">Ajouter une photo</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl h-40 flex flex-col items-center justify-center text-gray-400">
              <span className="text-sm">Ajouter une photo</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button type="button" onClick={onClose} className="bg-[#555555] text-white px-10 py-3 rounded-xl font-medium shadow-md">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotelModal;