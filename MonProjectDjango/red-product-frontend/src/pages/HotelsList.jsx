import React, { useState, useEffect } from 'react';
/* Sidebar supprimée d'ici car elle est déjà dans le Layout global */
import axios from 'axios';
import { Plus, Trash, X, Camera } from 'lucide-react';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    price_per_night: '',
    image: null
  });

  const fetchHotels = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/hotels/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHotels(response.data);
    } catch (err) {
      console.error("Erreur chargement:", err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const deleteHotel = async (id) => {
    if (window.confirm("Supprimer cet hôtel ?")) {
      const token = localStorage.getItem('access_token');
      try {
        await axios.delete(`http://127.0.0.1:8000/api/hotels/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchHotels();
      } catch (err) {
        alert("Erreur suppression");
      }
    }
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('name', newHotel.name);
    formData.append('location', newHotel.location);
    formData.append('price_per_night', newHotel.price_per_night);
    if (newHotel.image) {
      formData.append('image', newHotel.image);
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/hotels/", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setShowModal(false);
      setNewHotel({ name: '', location: '', price_per_night: '', image: null });
      fetchHotels();
    } catch (err) {
      alert("Erreur : " + JSON.stringify(err.response?.data));
    }
  };

  return (
    /* Suppression du flex et de la sidebar ici pour éviter le doublon */
    <main className="flex-1 flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium text-gray-800">Hôtels</h1>
          <span className="text-gray-400 text-sm">{hotels.length}</span>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-all"
        >
          <Plus size={18} /> Créer un nouveau hôtel
        </button>
      </header>

      {/* Grille d'affichage */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group relative">
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button onClick={() => deleteHotel(hotel.id)} className="p-2 bg-white rounded-full text-red-500 shadow-md hover:bg-red-50">
                <Trash size={14} />
              </button>
            </div>

            <img 
              src={hotel.image || "https://via.placeholder.com/300x200"} 
              alt={hotel.name} 
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <p className="text-[10px] text-[#FFD700] font-bold uppercase truncate">{hotel.location}</p>
              <h3 className="font-bold text-gray-800 text-sm truncate my-1">{hotel.name}</h3>
              <p className="text-xs text-gray-600">{hotel.price_per_night} XOF par nuit</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'ajout */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="uppercase text-sm font-bold flex items-center gap-2">
                <Plus size={18} className="text-gray-400"/> Créer un nouveau hôtel
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddHotel} className="p-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Nom de l'hôtel</label>
                <input 
                  className="border rounded p-2 text-sm outline-none focus:border-gray-400"
                  type="text" required value={newHotel.name}
                  onChange={(e) => setNewHotel({...newHotel, name: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Adresse</label>
                <input 
                  className="border rounded p-2 text-sm outline-none focus:border-gray-400"
                  type="text" required value={newHotel.location}
                  onChange={(e) => setNewHotel({...newHotel, location: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Prix par nuit</label>
                <input 
                  className="border rounded p-2 text-sm outline-none focus:border-gray-400"
                  type="number" required value={newHotel.price_per_night}
                  onChange={(e) => setNewHotel({...newHotel, price_per_night: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Devise</label>
                <input disabled className="border rounded p-2 text-sm bg-gray-50" value="XOF" />
              </div>

              <div className="col-span-2 flex flex-col gap-1 mt-2">
                <label className="text-xs font-bold text-gray-600">Ajouter une photo</label>
                <div className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center text-gray-400 relative">
                  <Camera size={32} />
                  <span className="text-xs mt-2">Cliquez pour ajouter une image</span>
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setNewHotel({...newHotel, image: e.target.files[0]})}
                  />
                  {newHotel.image && <p className="text-[10px] text-green-600 mt-1">{newHotel.image.name}</p>}
                </div>
              </div>

              <div className="col-span-2 flex justify-end mt-4">
                <button type="submit" className="bg-[#4a4d50] text-white px-6 py-2 rounded text-sm font-medium hover:bg-black transition-colors">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default HotelsList;