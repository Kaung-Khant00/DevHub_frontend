import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
  devTools: import.meta.env.VITE_ENV !== "production",
});

export default store;
