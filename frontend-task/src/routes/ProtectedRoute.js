import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // Redirect to login if not authenticated
  if (!auth || !auth.user) {
    return <Navigate to="/" />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
