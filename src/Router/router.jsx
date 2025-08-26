import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "../Pages/Auth/GuestLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Layout from "../Pages/Main/Layout/Layout";
import Feed from "../Pages/Main/Feed/Feed";
import CreatePost from "../Pages/Main/Feed/CreatePost";
import EditPost from "../Pages/Main/Feed/EditPost";
import ChooseRole from "../Pages/Auth/ChooseRole";
import OAuthCallBack from "../Pages/Auth/OAuthCallBack";
import Secure from "../Pages/Auth/Secure";

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
