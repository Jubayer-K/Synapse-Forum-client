import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import Membership from "../Pages/Membership/Membership";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import UserDashboard from "../Layout/UserDashboard/UserDashboard";
import AddPost from "../Pages/AddPost/AddPost";
import MyPost from "../Pages/MyPost/MyPost";
import MyProfile from "../Pages/MyProfile/MyProfile";
import AdminDashboard from "../Layout/AdminDashboard/AdminDashboard";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import Announcement from "../Layout/AdminDashboard/Announcement/Announcement";
import ManageUsers from "../Layout/AdminDashboard/ManageUsers/ManageUsers";
import ReportedActivities from "../Layout/AdminDashboard/ReportedActivities/ReportedActivities";
import PostDetails from "../Pages/PostDetails/PostDetails";
import PostComment from "../Pages/PostComment/PostComment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/membership",
        element: <Membership></Membership>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/post-details/:id",
        element: <PostDetails></PostDetails>,
        loader : ({params}) => fetch(`${import.meta.env.VITE_API_URL}/posts/${params.id}`)
      },
      {
        path: "/post-comments/:id",
        element: <PostComment></PostComment>,
        loader : ({params}) => fetch(`${import.meta.env.VITE_API_URL}/comments/${params.id}`)
      },
    ],
  },
  {
    path: "user-dashboard",
    element: <UserDashboard></UserDashboard>,
    children: [
      {
        path: "add-post",
        element: <AddPost></AddPost>,
      },
      {
        path: "my-posts",
        element: <MyPost></MyPost>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: <AdminDashboard></AdminDashboard>,
    children: [
      {
        path: "users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "report",
        element: <ReportedActivities></ReportedActivities>,
      },
      {
        path: "announcement",
        element: <Announcement></Announcement>,
      },
      {
        path: "admin-profile",
        element: <AdminProfile></AdminProfile>,
      },
    ],
  },
]);
