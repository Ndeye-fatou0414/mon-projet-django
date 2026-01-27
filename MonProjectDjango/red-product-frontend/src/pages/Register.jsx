import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Appel à l'API Django créée précédemment
      await axios.post("http://127.0.0.1:8000/api/register/", formData);
      alert("Inscription réussie ! Connectez-vous.");
      navigate("/");
    } catch (err) {
      alert("Erreur lors de l'inscription. Vérifiez vos informations.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#313538] font-sans overflow-hidden relative">
      
      {/* Motif de fond constant */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] rounded-full border-[40px] border-white/5"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[500px] h-[500px] rounded-full border-[50px] border-white/5"></div>
      </div>

      {/* Header Logo RED PRODUCT */}
      <div className="flex items-center gap-2 mb-5 z-10">
        <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
           <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-[#313538]"></div>
        </div>
        <span className="text-white font-bold text-lg tracking-widest uppercase">Red Product</span>
      </div>

      {/* Carte d'inscription - Compacte pour éviter le scroll */}
      <div className="w-[90%] max-w-[380px] bg-white rounded-md shadow-2xl p-7 z-10">
        <p className="text-gray-700 text-sm mb-6 font-medium text-center md:text-left">Inscrivez-vous en tant que Admin</p>

        <form onSubmit={handleRegister} className="flex flex-col">
          <div className="mb-5 border-b border-gray-200">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              className="w-full py-2 focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="mb-5 border-b border-gray-200">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full py-2 focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="mb-5 border-b border-gray-200">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full py-2 focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          {/* Checkbox Conditions (Figma) */}
          <div className="flex items-center gap-2 mb-6">
            <input 
              type="checkbox" 
              id="terms" 
              required
              className="w-4 h-4 accent-[#4a4d50] cursor-pointer" 
            />
            <label htmlFor="terms" className="text-gray-600 text-xs cursor-pointer">
              Accepter les termes et conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4a4d50] text-white py-3 rounded-md font-medium text-sm hover:bg-[#3f4245] transition-all"
          >
            S'inscrire
          </button>
        </form>
      </div>

      {/* Retour au Login */}
      <div className="mt-5 text-center z-10">
        <p className="text-white text-xs">
          Vous avez déjà un compte ?{" "}
          <Link to="/" className="text-[#FFD700] font-bold hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;