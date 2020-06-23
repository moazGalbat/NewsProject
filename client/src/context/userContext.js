import React, { useState, createContext ,useEffect } from 'react';
import {getAuthTokens,getUserFromToken} from "../helpers/authHelpers"

export const UserContext =  createContext()

const Provider = (props) => {
    const [currentUser,setCurrentUser] = useState(getUserFromToken(getAuthTokens()))
  
    useEffect(() => {
        const existingTokens = getAuthTokens();
        if (existingTokens) {
            setCurrentUser(getUserFromToken(existingTokens))
        }
    },[]);
  
    return (
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        {props.children}
      </UserContext.Provider>
    );
  };
  export default Provider;