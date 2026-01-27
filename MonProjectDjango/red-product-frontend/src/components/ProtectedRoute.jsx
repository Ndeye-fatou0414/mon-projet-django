import { Navigate } from 'react-router-dom';
import React from "react";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');

    // Si pas de token, on renvoie vers la page de login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Sinon, on affiche la page demandée
    return children;
};

export default ProtectedRoute;