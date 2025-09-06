import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";
import groupSlice from "./group/groupSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    group: groupSlice,
  },
  devTools: import.meta.env.VITE_ENV !== "production",
});

export default store;
