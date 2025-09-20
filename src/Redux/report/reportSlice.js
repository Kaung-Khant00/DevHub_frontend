import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";
import { toast } from "react-toastify";

export const reportPost = createAsyncThunk("report/reportPost", async ({ postId, reason }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/reports/post`, { reason, postId });
    console.log(response);
    toast.success("Post reported successfully!");
    return response.data.report;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

const initialState = {
  post: null,
  loading: false,
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
      .addCase(reportPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "reportPost":
            state.loading = false;
            break;
          default:
            break;
        }
      })
      .addMatcher(isPending, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "reportPost":
            state.loading = true;
            break;
          default:
            break;
        }
      });
  },
});
export const { setReportingPost } = reportSlice.actions;
export default reportSlice.reducer;
