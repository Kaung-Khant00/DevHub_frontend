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
import EditDevProfile from "../Pages/Main/Profile/EditDevProfile";
import DeveloperProfilePage from "../Pages/Main/DeveloperProfile/DeveloperProfile";
import GroupsPage from "../Pages/Group/Group";
import Admin from "../Pages/Admin/Admin";
import UsersAdminPage from "../Pages/Admin/UsersAdminPage";
import GroupCreationRequestAdminPage from "../Pages/Admin/GroupCreationRequestAdminPage";
import CreateGroup from "../Pages/Group/CreateGroup";
import SecureAdmin from "../Pages/Auth/SecureAdmin";
import NotificationPage from "../Pages/Notification/NotificationPage";
import NotificationDetail from "../Pages/Notification/NotificationDetail";
import UserGroupCreationRequestPage from "../Pages/Notification/GroupCreationRequestPage";
import UserGroupCreationRequestDetail from "../Pages/Notification/GroupCreationRequestDetailPage";
import UserGroupPage from "../Pages/Group/UserGroupPage";
import CreateGroupPost from "../Pages/Group/CreateGroupPost";
import GroupCommentPage from "../Components/Group/GroupComment";
import ReportPost from "../Pages/Report/ReportPost";
import ProfilePage from "../Pages/Main/Profile/Profile";
import ReportAdminPage from "../Pages/Admin/ReportAdminPage";
import ReportDetail from "../Components/Admin/Details/ReportPostDetail";
import AdminsPage from "../Pages/Admin/AdminsPage";
import CreateAdminPage from "../Pages/Admin/CreateAdminPage";
import QuestionPage from "../Pages/Dev/Questions/QuestionPage";
import CreateQuestionPage from "../Pages/Dev/Questions/CreateQuestionPage";
import QuestionDetailPage from "../Pages/Dev/Questions/QuestionDetailPage";

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
            children: [
              {
                path: "",
                element: <ProfilePage />,
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
            children: [
              {
                path: "",
                element: <GroupsPage />,
              },
              {
                path: "create",
                element: <CreateGroup />,
              },
              {
                path: "requests",
                element: <UserGroupCreationRequestPage />,
              },
              {
                path: "requests/:id",
                element: <UserGroupCreationRequestDetail />,
              },
              {
                path: ":id",
                element: <UserGroupPage />,
              },
              {
                path: ":id/post/create",
                element: <CreateGroupPost />,
              },
              {
                path: ":postId/post/comments",
                element: <GroupCommentPage />,
              },
            ],
          },
          {
            path: "notification",
            children: [
              {
                index: true,
                element: <NotificationPage />,
              },
              {
                path: ":id",
                element: <NotificationDetail />,
              },
            ],
          },
          {
            path: "report",
            children: [
              {
                path: "post/:postId",
                element: <ReportPost />,
              },
            ],
          },
          {
            path: "question",
            children: [
              { path: "", element: <QuestionPage /> },
              {
                path: "create",
                element: <CreateQuestionPage />,
              },
              {
                path: ":id",
                element: <QuestionDetailPage />,
              },
              {
                path: ":id/edit",
                element: <CreateQuestionPage />,
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
            path: "admins",
            children: [
              {
                path: "",
                element: <AdminsPage />,
              },
              {
                path: "create",
                element: <CreateAdminPage />,
              },
              {
                path: "edit/:id",
                element: <CreateAdminPage />,
              },
            ],
          },
          {
            path: "group_creation_requests",
            element: <GroupCreationRequestAdminPage />,
          },
          {
            path: "reports",
            children: [
              { path: "", element: <ReportAdminPage /> },
              { path: "detail/post/:id", element: <ReportDetail /> },
            ],
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
