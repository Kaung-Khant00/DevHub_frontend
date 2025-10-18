import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";
import { toast } from "react-toastify";

export const fetchReports = createAsyncThunk(
  "report/fetchReports",
  async ({ per_page, current_page, type, status }, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/reports", {
        params: {
          per_page: per_page,
          page: current_page,
          type,
          status,
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

export const togglePostVisibility = createAsyncThunk(
  "report/togglePostVisibility",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/reports/remove/temporary/post/${id}`);
      console.log("toggle post temporarily", response);
      return response.data.report;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
export const deletePostPermanently = createAsyncThunk(
  "report/deletePostPermanently",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/reports/remove/permanent/post/${id}`);
      console.log("delete post permanently", response);
      return response.data.report;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
export const notifyOwner = createAsyncThunk("report/notifyOwner", async (notification, { rejectWithValue }) => {
  try {
    const response = await api.post(`/admin/reports/notify/owner`, notification);
    console.log("notify owner", response);
    toast.success("Message send");
    return response.data.report;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});
export const deleteReport = createAsyncThunk("report/deleteReport", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/admin/reports/${id}`);
    console.log("delete report", response);
    return id;
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
    status: "",
  },
  pagination: {
    per_page: 4,
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
    visibility: true,
    visibilityLoading: false,
    deletePostLoading: false,
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
    changeReportsStatus: (state, action) => {
      state.fetch.status = action.payload;
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
        state.detail.visibility = action.payload.reportable.visibility;
      })
      .addCase(changeReportStatus.fulfilled, (state, action) => {
        state.detail.data = action.payload;
        if (state.fetch.data?.length > 0) {
          state.fetch.data = state.fetch.data.map((report) => {
            if (report.id === action.payload.id) {
              return action.payload;
            }
            return report;
          });
        }
      })
      .addCase(togglePostVisibility.fulfilled, (state, action) => {
        state.detail.data = action.payload;
        state.detail.visibility = action.payload.reportable.visibility;
        state.detail.visibilityLoading = false;
      })
      .addCase(deletePostPermanently.fulfilled, (state, action) => {
        state.detail.data = action.payload;
        state.detail.removePermanentlyLoading = false;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.fetch.data = state.fetch.data.filter((report) => report.id !== action.payload);
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
          case "togglePostVisibility":
            state.detail.visibilityLoading = false;
            break;
          case "deletePostPermanently":
            state.detail.removePermanentlyLoading = false;
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
          case "togglePostVisibility":
            state.detail.visibilityLoading = true;
            break;
          case "deletePostPermanently":
            state.detail.removePermanentlyLoading = true;
            break;
          default:
            break;
        }
      });
  },
});
export const { changeReportType, changeReportsStatus } = adminReportsSlice.actions;
export default adminReportsSlice.reducer;
