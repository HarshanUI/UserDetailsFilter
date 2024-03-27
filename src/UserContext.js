import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from 'axios';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [todoValues, setTodoValues] = useState([]);

   useEffect(async () => {
    const result = await axios('https://jsonplaceholder.typicode.com/users',);
    setUserDetails(result.data);
  }, []);

  useEffect(async () => {
    const result = await axios('https://jsonplaceholder.typicode.com/todos',);
    setTodoValues(result.data);
  }, []);

  const userData = useMemo(()=>{
    return {
        users: userDetails,
        todo: todoValues,
        setUserDetails: setUserDetails
    }
  },[userDetails,todoValues]) 

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
