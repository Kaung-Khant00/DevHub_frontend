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
export const fetchReportDetail = createAsyncThunk(
  "report/fetchReportDetail",
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/reports/detail/${id}`, {
        params: {
          type,
        },
      });
      console.log("REPORT DETAIL", response);
      return response.data.report;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

export const changeReportStatus = createAsyncThunk(
  "report/changeReportStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/reports/status`, {
        id,
        status,
      });
      console.log("Changing report status", response);
      return response.data.report;
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
  detail: {
    data: null,
    loading: false,
    resolveLoading: false,
    dismissLoading: false,
    error: null,
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
    changeResponseStatusLoading: (state, action) => {
      if (action.payload.status === "resolved") {
        state.detail.resolveLoading = false;
      } else if (action.payload.status === "dismissed") {
        state.detail.dismissLoading = false;
      }
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
      .addCase(fetchReportDetail.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.data = action.payload;
      })
      .addCase(changeReportStatus.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.data = action.payload;
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchReports":
            state.fetch.loading = false;
            state.fetch.error = action.payload;
            break;
          case "fetchReportDetail":
            state.detail.loading = false;
            state.detail.error = action.payload;
            break;
          case "changeReportStatus":
            state.detail.loading = false;
            state.detail.error = action.payload;
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
          case "fetchReportDetail":
            state.detail.loading = true;
            state.detail.error = null;
            break;
          case "changeReportStatus":
            state.detail.loading = true;
            state.detail.error = null;
            break;
          default:
            break;
        }
      });
  },
});
export const { changeReportType } = adminReportsSlice.actions;
export default adminReportsSlice.reducer;
