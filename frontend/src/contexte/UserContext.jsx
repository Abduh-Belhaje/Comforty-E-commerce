import React, { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { user } = useUser();
  const [userUp, setUserUp] = useState(null); // For sign-up data
  const [userIn, setUserIn] = useState(null); // For sign-in data

  useEffect(() => {
    if (user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      setUserIn({ u_email: userEmail });

      if (!userUp) {
        const userData = {
          u_email: userEmail,
          first_name: user.firstName,
          last_name: user.lastName,
        };
        setUserUp(userData);
        console.log("User data:", userData);
      }
    }
  }, [user, userUp]);

  return (
    <UserContext.Provider value={{ userUp, userIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
