import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { Table, Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data';
import {
  RouterProvider,
} from "react-router-dom";
import router from './router'
import { UserContext, UserContextProvider } from "./UserContext";

function App() {

  const [userDetails, setUserDetails] = useState([]);
  const [userValues, setUserValues] = useState([]);
   const [selectedUser,setSelectedUser] = useState();
  useEffect(async () => {
    const result = await axios('https://jsonplaceholder.typicode.com/users',);
    setUserDetails(result.data);
  }, []);

  useEffect(async () => {
    const result = await axios('https://jsonplaceholder.typicode.com/todos',);
    setUserValues(result.data);
  }, []);

  return (
    <div className='mainContainer'>
      <UserContextProvider>
        <div>
          <div class="bg-sliver">
            <Nav.Link href="/users">{"Users"}</Nav.Link>
            {
              data.map((item) => {
                return (<Nav defaultActiveKey="/home" className="flex-column">
                  <Nav.Link href={`/user/${item.id}`}>{item.username}</Nav.Link>
                </Nav>);
              })
            }
          </div>
        </div>
        <div>
          <RouterProvider router={router} />
        </div>
      </UserContextProvider>
    </div>
  );
}

export default App;
