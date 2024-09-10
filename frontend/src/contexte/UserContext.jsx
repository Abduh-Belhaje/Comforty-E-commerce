import React, { createContext, } from "react";

const UserContext = createContext();


const UserProvider = ({children}) =>{

  
  return (
      <UserContext.Provider>
        {children}
      </UserContext.Provider>
    );
}

export { UserContext, UserProvider }; 