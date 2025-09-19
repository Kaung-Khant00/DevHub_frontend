import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const reportPost = createAsyncThunk("report/reportPost", async ({ postId, reason }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/reports/${postId}/post`, { reason });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

const initialState = {
  post: null,
};
const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportingPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          default:
            break;
        }
      })
      .addMatcher(isPending, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          default:
            break;
        }
      });
  },
});
export const { setReportingPost } = reportSlice.actions;
export default reportSlice.reducer;
