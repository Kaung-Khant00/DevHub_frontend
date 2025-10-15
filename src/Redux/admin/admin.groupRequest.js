import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";
import { toast } from "react-toastify";

/*
|------------------------------------------------------------------------
| FETCH ALL GROUP REQUEST
|------------------------------------------------------------------------
*/
export const fetchAllGroupRequest = createAsyncThunk(
  "groupRequest/fetchGroupRequest",
  async ({ current_page, all_per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/group_requests/all", {
        params: {
          page: current_page,
          per_page: all_per_page,
        },
      });
      console.log(response);
      return response.data.group_creation_requests;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

/*
|------------------------------------------------------------------------
| FETCH GROUP REQUESTS
|------------------------------------------------------------------------
*/
export const fetchGroupRequest = createAsyncThunk(
  "groupRequest/fetchGroupRequest",
  async ({ current_page, per_page, status = "pending" }, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/group_requests", {
        params: {
          page: current_page,
          per_page,
          status,
        },
      });
      console.log(response);
      return response.data.group_creation_requests;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

/*
|------------------------------------------------------------------------
| APPROVE GROUP REQUEST
|------------------------------------------------------------------------
*/
export const approveGroupRequest = createAsyncThunk(
  "groupRequest/approveGroupRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/group_requests/${id}/approve`);
      console.log(response);
      toast.success("Group Request approved successfully!");
      return response.data.group_creation_request;
    } catch (err) {
      console.log(err);
      toast.error("Group Request not found !");
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
/*
|------------------------------------------------------------------------
|  REJECT GROUP REQUEST
|------------------------------------------------------------------------
*/
export const rejectGroupRequest = createAsyncThunk(
  "groupRequest/rejectGroupRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/group_requests/${id}/reject`);
      console.log(response);
      toast.success("Group Request rejected successfully!");
      return response.data.group_creation_request;
    } catch (err) {
      console.log(err);
      toast.error("Group Request not found !");
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

const initialState = {
  groupRequests: {
    data: null,
    pagination: {
      current_page: 1,
      all_per_page: 3,
      last_page: 1,
      per_page: 3,
      total: null,
    },
    status: "pending",
    fetchLoading: false,
    error: null,
  },
};
const groupRequestSlice = createSlice({
  name: "groupRequest",
  initialState,
  reducers: {
    changeGroupRequestStatus(state, action) {
      state.groupRequests.status = action.payload;
      state.groupRequests.pagination = {
        ...state.groupRequests.pagination,
        current_page: 1,
        last_page: null,
        per_page: 1,
        total: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupRequest.fulfilled, (state, action) => {
        state.groupRequests.fetchLoading = false;
        state.groupRequests.error = null;
        state.groupRequests.data = action.payload.data;
        state.groupRequests.pagination = {
          ...state.groupRequests.pagination,
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          per_page: action.payload.per_page,
          total: action.payload.total,
        };
      })
      .addCase(approveGroupRequest.fulfilled, (state, action) => {
        state.groupRequests.fetchLoading = false;
        state.groupRequests.error = null;
        if (state.groupRequests.status === "pending") {
          state.groupRequests.data = state.groupRequests.data.filter((request) => request.id !== action.payload.id);
        }
        state.groupRequests.data = state.groupRequests.data.map((request) => {
          if (request.id === action.payload.id) {
            return action.payload;
          }
          return request;
        });
      })
      .addCase(rejectGroupRequest.fulfilled, (state, action) => {
        state.groupRequests.loading = false;
        state.groupRequests.error = null;
        if (state.groupRequests.status === "pending") {
          state.groupRequests.data = state.groupRequests.data.filter((request) => request.id !== action.payload.id);
        }
        state.groupRequests.data = state.groupRequests.data.map((request) => {
          if (request.id === action.payload.id) {
            return action.payload;
          }
          return request;
        });
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchGroupRequest":
            state.groupRequests.fetchLoading = false;
            state.groupRequests.error = action.payload;
            break;
          default:
            break;
        }
      })
      .addMatcher(isPending, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchGroupRequest":
            state.groupRequests.fetchLoading = true;
            state.groupRequests.error = null;
            break;
          default:
            break;
        }
      });
  },
});
export const { changeGroupRequestStatus } = groupRequestSlice.actions;
export default groupRequestSlice.reducer;
