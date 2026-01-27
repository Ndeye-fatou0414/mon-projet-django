import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MotDePasseOublie() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux appeler ton backend pour envoyer un lien de réinitialisation
    alert(`Lien de réinitialisation envoyé à ${email}`);
    navigate("/"); // Retour à la page AdminLogin
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white rounded-lg px-8 py-10 shadow-lg">
        {/* Titre */}
        <h2 className="text-2xl font-medium text-gray-800 mb-8 text-center">
          Mot de passe oublié
        </h2>
        <p>Entrer votre adresse e-mail ci-dessous et 
            nous vous envoyons des instruction sur la 
            facon de modifier votre mot de passe.
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <input
            type="email"
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-600 pb-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#4a4d50] text-white py-3 rounded-md text-lg font-medium hover:bg-[#3f4245] transition"
          >
            Envoyer le lien
          </button>
        </form>

        {/* Lien retour centré */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-red-600 font-semibold hover:underline"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
}
