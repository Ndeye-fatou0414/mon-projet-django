import api from '../api';

export const login = async (email, password) => {
    try {
        // Django SimpleJWT utilise 'username' par défaut, on lui passe l'email
        const response = await api.post('/api/token/', {
            username: email,
            password: password
        });

        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};