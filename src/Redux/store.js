import { combineReducers, configureStore } from "@reduxjs/toolkit";
/*  user side slices */
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";
import groupSlice from "./group/groupSlice";
import notificationSlice from "./user/notificationSlice";

/*  admin side slices */
import adminUserSlice from "./admin/admin.user";
import groupRequestSlice from "./admin/admin.groupRequest";

const adminReducer = combineReducers({
  user: adminUserSlice,
  groupRequest: groupRequestSlice,
});

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    group: groupSlice,
    admin: adminReducer,
    notification: notificationSlice,
  },
  devTools: import.meta.env.VITE_ENV !== "production",
});

export default store;
