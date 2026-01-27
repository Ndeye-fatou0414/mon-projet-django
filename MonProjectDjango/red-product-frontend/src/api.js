import axios from 'axios';

const api = axios.create({
    // L'URL de votre serveur Django
    baseURL: 'http://127.0.0.1:8000' 
});

// Cet "intercepteur" ajoute le token automatiquement s'il existe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;