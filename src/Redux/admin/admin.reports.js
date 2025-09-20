import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const fetchReports = createAsyncThunk("report/fetchReports", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/admin/reports");
    console.log(response);
    return response.data.admin;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

const initialState = {
  fetch: {
    data: null,
    loading: false,
    error: null,
  },
  token: localStorage.getItem("token") || null,
};
const adminReportsSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.fetch.loading = false;
        state.fetch.error = null;
        state.fetch.data = action.payload;
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchReports":
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
          case "fetchReports":
            state.fetch.loading = true;
            state.fetch.error = null;
            break;
          default:
            break;
        }
      });
  },
});
// export const {} = adminReportsSlice.actions;
export default adminReportsSlice.reducer;
