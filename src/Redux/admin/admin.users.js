import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async ({ current_page = 1, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/super_admin/users", {
        params: {
          page: current_page,
          per_page,
        },
      });
      console.log("SUPER SUPER ADMIN ADMIN", response);

      return response.data.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

const initialState = {
  fetch: {
    data: null,
    loading: false,
  },
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 1,
    total: null,
  },
};
const adminUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetch.loading = false;
        state.fetch.data = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          per_page: action.payload.per_page,
          total: action.payload.total,
        };
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchUsers":
            state.fetch.loading = false;
            state.fetch.error = action.payload;
            break;
          default:
            break;
        }
      })
      .addMatcher(isPending, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchUsers":
            state.fetch.loading = true;
            state.fetch.error = null;
            break;
          default:
            break;
        }
      });
  },
});
// export const {} = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
