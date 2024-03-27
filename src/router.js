import React, { Suspense } from "react";
import {
    createBrowserRouter,
  } from "react-router-dom";
const Users = React.lazy(()=> import('./pages/users'))
const Todo = React.lazy(()=>import('./pages/todo'))
const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          Click on side navigation bar to display the data
        </div>
      ),
    },
    {
      path: "/users",
      element: (
        <div>
            <Suspense fallback={<div>loading...</div>}>
                <Users />
            </Suspense>
        </div>
      ),
    },
    {
        path: "/user/:userId",
        element: (
          <div>
              <Suspense fallback={<div>loading...</div>}>
                  <Todo />
              </Suspense>
          </div>
        ),
      },
  ]);

  export default router