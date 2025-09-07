import { createBrowserRouter } from "react-router-dom";
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
import DeveloperProfilePage from "../Pages/Main/DeveloperProfile/DeveloperProfile";
import GroupsPage from "../Pages/Group/Group";
import Admin from "../Pages/Admin/Admin";
import UsersAdminPage from "../Pages/Admin/UsersAdminPage";
import GroupCreationRequestPage from "../Pages/Admin/GroupCreationRequestPage";
import GroupLayout from "../Pages/Group/GroupLayout";
import CreateGroup from "../Pages/Group/CreateGroup";
import SecureAdmin from "../Pages/Auth/SecureAdmin";

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
                path: "",
                element: <Profile />,
              },
              {
                path: ":id",
                element: <DeveloperProfilePage />,
              },
              {
                path: "edit",
                element: <EditDevProfile />,
              },
            ],
          },
          {
            path: "group",
            element: <GroupLayout />,
            children: [
              {
                index: true,
                element: <GroupsPage />,
              },
              {
                path: "create",
                element: <CreateGroup />,
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
    path: "/admin",
    element: <SecureAdmin />,
    children: [
      {
        path: "",
        element: <Admin />,
        children: [
          {
            path: "users",
            element: <UsersAdminPage />,
          },
          {
            path: "group_creation_requests",
            element: <GroupCreationRequestPage />,
          },
        ],
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
