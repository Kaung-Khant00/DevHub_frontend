import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "../Pages/Auth/GuestLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Layout from "../Pages/Main/Layout/Layout";
import Feed from "../Pages/Main/Feed/Feed";
import CreatePost from "../Pages/Main/Feed/CreatePost";
import EditPost from "../Pages/Main/Feed/EditPost";
import Comment from "../Pages/Main/Feed/Comment";
import ChooseRole from "../Pages/Auth/ChooseRole";
import OAuthCallBack from "../Pages/Auth/OAuthCallBack";
import Secure from "../Pages/Auth/Secure";
import Profile from "../Pages/Main/Profile/Profile";
import EditDevProfile from "../Pages/Main/Profile/EditDevProfile";
import ProfileLayout from "../Pages/Main/Profile/ProfileLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Secure />,
        children: [
          {
            path: "feed",
            element: <Feed />,
          },
          {
            path: "post",
            children: [
              {
                path: "create",
                element: <CreatePost />,
              },
              {
                path: "edit/:id",
                element: <EditPost />,
              },
              {
                path: ":id/comments",
                element: <Comment />,
              },
            ],
          },
          {
            path: "profile",
            element: <ProfileLayout />,
            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                path: "edit",
                element: <EditDevProfile />,
              },
            ],
          },
        ],
      },
      {
        path: "select/role",
        element: <ChooseRole />,
      },
    ],
  },
  {
    path: "/auth",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "oauth/callback",
        element: <OAuthCallBack />,
      },
    ],
  },
]);

export default router;
