import { combineReducers, configureStore } from "@reduxjs/toolkit";
/*  user side slices */
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";
import groupSlice from "./group/groupSlice";
import groupPostsSlice from "./group/groupPostsSlice";
import notificationSlice from "./user/notificationSlice";
import reportSlice from "./report/reportSlice";

/*  admin side slices */
import adminUserSlice from "./admin/admin.user";
import groupRequestSlice from "./admin/admin.groupRequest";
import adminUsersSlice from "./admin/admin.users";

const adminReducer = combineReducers({
  user: adminUserSlice,
  groupRequest: groupRequestSlice,
  users: adminUsersSlice,
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
  },
  devTools: import.meta.env.VITE_ENV !== "production",
});

export default store;
