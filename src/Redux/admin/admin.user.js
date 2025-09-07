import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const fetchAdminUser = createAsyncThunk("admin/fetchAdminUser", async (_, { rejectWithValue }) => {
  console.log("FETCHINg");
  try {
    console.log("FETCHINg");
    const response = await api.get("/admin");
    console.log(response);
    return response.data.admin;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

const initialState = {
  user: {
    data: null,
    loading: false,
    error: null,
  },
  token: localStorage.getItem("token") || null,
};
const adminUserSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUser.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.error = null;
        state.user.data = action.payload;
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchAdminUser":
            state.user.loading = false;
            state.user.error = action.payload;
            break;
          default:
            break;
        }
      })
      .addMatcher(isPending, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchAdminUser":
            state.user.loading = true;
            state.user.error = null;
            break;
          default:
            break;
        }
      });
  },
});
// export const {} = adminUserSlice.actions;
export default adminUserSlice.reducer;
