import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: email,
        password: password,
      });
      localStorage.setItem("access_token", response.data.access);
      navigate("/dashboard");
     } catch (err) {
    // Cela affichera l'erreur réelle dans la console (F12)
    console.log("Erreur complète:", err.response?.data); 
    alert("Détails : " + JSON.stringify(err.response?.data));
}
  };

  return (
    /* h-screen + overflow-hidden pour empêcher tout défilement */
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#313538] font-sans overflow-hidden relative">
      
      {/* Cercles de fond (Positionnés pour ne pas gêner la lecture) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] rounded-full border-[40px] border-white/5"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[500px] h-[500px] rounded-full border-[50px] border-white/5"></div>
      </div>

      {/* 1. Header Logo (Marge réduite) */}
      <div className="flex items-center gap-2 mb-6 z-10">
        <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
           <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-[#313538]"></div>
        </div>
        <span className="text-white font-bold text-lg tracking-widest uppercase">Red Product</span>
      </div>

      {/* 2. Carte de connexion (Taille ajustée pour tenir sans scroll) */}
      <div className="w-[90%] max-w-[380px] bg-white rounded-md shadow-2xl p-8 z-10">
        <p className="text-gray-700 text-sm mb-8">Connectez-vous en tant que Admin</p>

        <form onSubmit={handleLogin} className="flex flex-col">
          {/* Inputs avec marges réduites */}
          <div className="mb-6 border-b border-gray-200">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full py-2 focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 border-b border-gray-200">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full py-2 focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2 mb-8">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 accent-[#4a4d50] cursor-pointer" 
            />
            <label htmlFor="remember" className="text-gray-600 text-xs cursor-pointer">
              Gardez-moi connecté
            </label>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-[#4a4d50] text-white py-3 rounded-md font-medium text-sm hover:bg-[#3f4245] transition-all"
          >
            Se connecter
          </button>
        </form>
      </div>

      {/* 3. Pied de page (Liens rapprochés de la carte) */}
      <div className="mt-6 text-center z-10">
        <a href="#" className="block text-[#FFD700] text-sm font-bold hover:underline mb-2">
          Mot de passe oublié ?
        </a>
        <p className="text-white text-xs">
          Vous n'avez pas de compte ?{" "}
          <Link to="/register" className="text-[#FFD700] font-bold hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;