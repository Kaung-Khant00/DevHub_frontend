import { combineReducers, configureStore } from "@reduxjs/toolkit";
/*  user side slices */
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";
import groupSlice from "./group/groupSlice";
import groupPostsSlice from "./group/groupPostsSlice";
import notificationSlice from "./user/notificationSlice";
import reportSlice from "./report/reportSlice";
import questionSlice from "./question/questionSlice";

/*  admin side slices */
import adminUserSlice from "./admin/admin.user";
import groupRequestSlice from "./admin/admin.groupRequest";
import adminUsersSlice from "./admin/admin.users";
import adminReportSlice from "./admin/admin.reports";
import adminAdminsSlice from "./admin/admin.admins"; // sounds like a type or error but I want the name to be in consistence

const adminReducer = combineReducers({
  user: adminUserSlice,
  admins: adminAdminsSlice,
  groupRequest: groupRequestSlice,
  users: adminUsersSlice,
  report: adminReportSlice,
});

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    group: groupSlice,
    admin: adminReducer,
    notification: notificationSlice,
    groupPost: groupPostsSlice,
    report: reportSlice,
    question: questionSlice,
  },
  devTools: import.meta.env.VITE_ENV !== "production",
});

export default store;
