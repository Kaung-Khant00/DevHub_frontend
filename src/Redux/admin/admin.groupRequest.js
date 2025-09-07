import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const fetchGroupRequest = createAsyncThunk(
  "groupRequest/fetchGroupRequest",
  async ({ current_page, per_page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/group_requests", {
        params: {
          page: current_page,
          per_page: per_page,
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

const initialState = {
  groupRequests: {
    data: null,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 0,
      links: [],
    },
    loading: false,
    error: null,
  },
};
const groupRequestSlice = createSlice({
  name: "groupRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupRequest.fulfilled, (state, action) => {
        state.groupRequests.loading = false;
        state.groupRequests.error = null;
        state.groupRequests.data = action.payload.data;
        state.groupRequests.pagination = {
          current_page: action.payload.current_page + 1,
          last_page: action.payload.last_page,
          per_page: action.payload.per_page,
          total: action.payload.total,
          links: action.payload.links,
        };
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchGroupRequest":
            state.groupRequests.loading = false;
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
            state.groupRequests.loading = true;
            state.groupRequests.error = null;
            break;
          default:
            break;
        }
      });
  },
});
// export const {} = groupRequestSlice.actions;
export default groupRequestSlice.reducer;
