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
import PrivateRoutes from "./PrivateRoutes";

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
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/posts/${params.id}`),
      },
      {
        path: "/post-comments/:id",
        element: <PostComment></PostComment>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/comments/${params.id}`),
      },
    ],
  },
  {
    path: "user-dashboard",
    element: (
      <PrivateRoutes>
        <UserDashboard></UserDashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "add-post",
        element: (
          <PrivateRoutes>
            <AddPost></AddPost>
          </PrivateRoutes>
        ),
      },
      {
        path: "my-posts",
        element: (
          <PrivateRoutes>
            {" "}
            <MyPost></MyPost>
          </PrivateRoutes>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoutes>
            {" "}
            <MyProfile></MyProfile>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: (
      <PrivateRoutes>
        {" "}
        <AdminDashboard></AdminDashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "users",
        element: (
          <PrivateRoutes>
            {" "}
            <ManageUsers></ManageUsers>
          </PrivateRoutes>
        ),
      },
      {
        path: "report",
        element: (
          <PrivateRoutes>
            <ReportedActivities></ReportedActivities>
          </PrivateRoutes>
        ),
      },
      {
        path: "announcement",
        element: (
          <PrivateRoutes>
            {" "}
            <Announcement></Announcement>
          </PrivateRoutes>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <PrivateRoutes>
            <AdminProfile></AdminProfile>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
