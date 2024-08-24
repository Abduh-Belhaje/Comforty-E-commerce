import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const { isSignedIn } = useUser();

    return isSignedIn ? element : <Navigate to="/auth/sign-in" />;
};

export default ProtectedRoute;