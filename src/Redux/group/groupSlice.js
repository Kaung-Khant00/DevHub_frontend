import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";
import { toast } from "react-toastify";
import { fetchGroupRequest } from "../user/notificationSlice";

export const createGroup = createAsyncThunk("group/createGroup", async (groupData, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.post("groups/create", groupData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    dispatch(fetchGroupRequest());
    toast.success("Group created successfully!");

    return response.data.group_creation_request;
  } catch (err) {
    toast.error("Something went wrong!");
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});
export const fetchGroups = createAsyncThunk("group/fetchGroups", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`groups`);
    console.log(response);
    return response.data.groups;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});
export const fetchGroupDetail = createAsyncThunk("group/fetchGroupDetail", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`groups/${id}`);
    console.log(response);
    return response.data.group;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

const initialState = {
  fetch: {
    loading: false,
    data: [],
  },
  create: {
    loading: false,
    error: null,
  },
  detail: {
    loading: false,
    data: null,
  },
};
const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.error = null;
        state.fetch.data = [action.payload, ...state.fetch.data];
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.fetch.loading = false;
        state.fetch.data = action.payload;
      })
      .addCase(fetchGroupDetail.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.data = action.payload;
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];

        switch (actionName) {
          case "createGroup":
            state.create.loading = false;
            state.create.error = action.payload;
            break;
          case "fetchGroups":
            state.fetch.loading = false;
            break;
          case "fetchGroupDetail":
            state.detail.loading = false;
            break;
          default:
            break;
        }
      })
      .addMatcher(isPending, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "createGroup":
            state.create.loading = true;
            state.create.error = null;
            break;
          case "fetchGroups":
            state.fetch.loading = true;
            break;
          case "fetchGroupDetail":
            state.detail.loading = true;
            break;
          default:
            break;
        }
      });
  },
});
// export const {} = groupSlice.actions;
export default groupSlice.reducer;
