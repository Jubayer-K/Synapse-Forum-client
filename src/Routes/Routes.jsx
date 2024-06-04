import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import Membership from "../Pages/Membership/Membership";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error>,
      children : [
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/membership',
            element:<Membership></Membership>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
      ]
    },
  ]);