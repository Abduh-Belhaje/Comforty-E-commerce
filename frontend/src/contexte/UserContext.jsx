// UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-react';
import { signUpUser } from '../services/authService';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { user: clerkUser } = useClerkUser();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const handleSignUp = async (userData) => {
      try {
        const response = await signUpUser(userData); 
        localStorage.setItem('accessToken', response.token); 
        console.log('Sign-up successful, token stored:', response.token);
      } catch (error) {
        console.error('Sign-up failed:', error);
      }
    };

    if (clerkUser) {
      const userData = {
        u_email: clerkUser.primaryEmailAddress?.emailAddress,
        first_name: clerkUser.firstName,
        last_name: clerkUser.lastName,
      };
      setUser(userData);
      handleSignUp(userData); 
      console.log('User data:', userData);
    }
  }, [clerkUser]);

  return (
    <UserContext.Provider value={{ user, token }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
