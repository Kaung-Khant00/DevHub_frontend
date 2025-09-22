import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const fetchReports = createAsyncThunk(
  "report/fetchReports",
  async ({ per_page, current_page, type }, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/reports", {
        params: {
          per_page: per_page,
          page: current_page,
          type,
        },
      });
      console.log("REPORTS", response);
      return response.data.reports;
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
    error: null,
  },
  pagination: {
    per_page: 2,
    current_page: 1,
    last_page: null,
    sortBy: "created_at,desc",
  },
  type: "post",
};
const adminReportsSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    changeReportType: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.fulfilled, (state, action) => {
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
export const { changeReportType } = adminReportsSlice.actions;
export default adminReportsSlice.reducer;
