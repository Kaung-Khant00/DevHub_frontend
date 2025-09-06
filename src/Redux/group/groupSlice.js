import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const createGroup = createAsyncThunk("group/createGroup", async (groupData, { rejectWithValue }) => {
  try {
    const response = await api.post("groups/create", groupData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    return response.data.group_creation_request;
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
};
const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.create.loading = false;
      state.create.error = null;
      state.fetch.data = [action.payload, ...state.fetch.data];
    });
    builder.addMatcher(isRejected(createGroup), (state, action) => {
      const actionName = action.type.split("/")[1];

      switch (actionName) {
        case "createGroup":
          state.create.loading = false;
          state.create.error = action.payload;
          break;
        default:
          break;
      }
    });
    builder.addMatcher(isPending(createGroup), (state, action) => {
      const actionName = action.type.split("/")[1];
      switch (actionName) {
        case "createGroup":
          state.create.loading = true;
          state.create.error = null;
          break;
        default:
          break;
      }
    });
  },
});
// export const {} = groupSlice.actions;
export default groupSlice.reducer;
