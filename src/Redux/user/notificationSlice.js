import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const fetchNotification = createAsyncThunk(
  "notification/fetchNotification",
  async (type, { rejectWithValue }) => {
    try {
      const response = await api.get("notifications", {
        params: {
          type,
        },
      });
      console.log(response);
      return response.data.notifications;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
export const fetchDetailNotification = createAsyncThunk(
  "notification/fetchDetailNotification",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`notifications/${id}`);
      console.log("Detail notification", response);
      return response.data.notification;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

export const fetchGroupRequest = createAsyncThunk("groupRequest/fetchGroupRequest", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/group_requests");
    console.log(response);
    return response.data.group_creation_requests;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

export const fetchGroupRequestDetail = createAsyncThunk(
  "groupRequest/fetchGroupRequestDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/group_requests/${id}`);
      console.log(response);
      return response.data.group_creation_request;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

export const deleteGroupRequest = createAsyncThunk(
  "groupRequest/deleteGroupRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/group_requests/${id}`);
      console.log(response);
      return id;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

const initialState = {
  fetch: {
    loading: false,
    data: [],
  },
  detail: {
    data: null,
    loading: false,
  },
  groupRequest: {
    data: [],
    loading: false,
    deleteLoading: false,
  },
  groupRequestDetail: {
    data: null,
    loading: false,
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setDetailNotification(state, action) {
      state.detail.data = state.fetch.data.find((notification) => notification.id === action.payload);
    },
    setNotificationRead(state, action) {
      state.fetch.data = state.fetch.data.map((notification) => {
        if (action.payload === notification.id) notification.is_read = true;
        return notification;
      });
    },
    setNotificationAllRead(state) {
      state.fetch.data = state.fetch.data.map((notification) => {
        notification.is_read = true;
        return notification;
      });
    },
    deleteNotification(state, action) {
      state.fetch.data = [...state.fetch.data.filter((notification) => notification.id !== action.payload)];
    },
    clearDetailNotification(state) {
      state.detail.data = null;
    },
    removeReadNotification(state) {
      state.fetch.data = [...state.fetch.data.filter((notification) => notification.is_read === false)];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.fetch.loading = false;
        state.fetch.data = action.payload;
      })
      .addCase(fetchDetailNotification.fulfilled, (state, action) => {
        state.detail.data = action.payload;
        state.detail.loading = false;
      })
      .addCase(fetchGroupRequest.fulfilled, (state, action) => {
        state.groupRequest.loading = false;
        state.groupRequest.data = action.payload;
      })
      .addCase(fetchGroupRequestDetail.fulfilled, (state, action) => {
        state.groupRequestDetail.loading = false;
        state.groupRequestDetail.data = action.payload;
      })
      .addCase(deleteGroupRequest.fulfilled, (state, action) => {
        state.groupRequest.data = [...state.groupRequest.data.filter((request) => request.id != action.payload)];
        state.groupRequest.deleteLoading = false;
      });
    builder.addMatcher(isRejected, (state, action) => {
      const actionName = action.type.split("/")[1];

      switch (actionName) {
        case "fetchNotification":
          state.fetch.loading = false;
          break;
        case "fetchDetailNotification":
          state.detail.loading = false;
          break;
        case "fetchGroupRequest":
          state.groupRequest.loading = false;
          break;
        case "fetchGroupRequestDetail":
          state.groupRequestDetail.loading = false;
          break;
        case "deleteGroupRequest":
          state.groupRequest.deleteLoading = false;
          break;
        default:
          break;
      }
    });
    builder.addMatcher(isPending, (state, action) => {
      const actionName = action.type.split("/")[1];
      switch (actionName) {
        case "fetchNotification":
          state.fetch.loading = true;
          state.fetch.error = null;
          break;
        case "fetchDetailNotification":
          state.detail.loading = true;
          break;
        case "fetchGroupRequest":
          state.groupRequest.loading = true;
          break;
        case "fetchGroupRequestDetail":
          state.groupRequestDetail.loading = true;
          break;
        case "deleteGroupRequest":
          state.groupRequest.deleteLoading = true;
          break;
        default:
          break;
      }
    });
  },
});
export const {
  clearDetailNotification,
  setDetailNotification,
  setNotificationRead,
  setNotificationAllRead,
  deleteNotification,
  removeReadNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
