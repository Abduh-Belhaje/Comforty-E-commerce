import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { signInApi, fetchUserDataFromAuthApi } from '../api/authApi'; // Adjust the path to your API file

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  // Function to handle sign-in and send user data
  const signIn = async (userData) => {
    try {
      const response = await signInApi(userData);
      console.log('Sign-in response:', response);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  // Fetch and set user data when the user object changes
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userData = {
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.emailAddresses[0]?.emailAddress,
          };
          const response = await fetchUserDataFromAuthApi(userData);
          setUserData(response); // Update state with fetched user data
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  // Update the context value
  const value = {
    user,
    userData,
    setUserData,
    signIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
