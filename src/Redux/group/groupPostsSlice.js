import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const fetchGroupPosts = createAsyncThunk(
  "admin/fetchGroupPosts",
  async ({ current_page = 1, per_page, group_id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/groups/${group_id}/posts`, {
        params: {
          page: current_page,
          per_page,
        },
      });
      console.log("GROUP POSTS", response);
      return response.data.posts;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
export const likeGroupPost = createAsyncThunk("groupPost/likeGroupPost", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/groups/${id}/like`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});
export const fetchGroupPostDetail = createAsyncThunk(
  "groupPost/fetchGroupPostDetail",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/groups/${postId}/posts/detail`);
      console.log("GROUP POST DETAIL", response);
      return response.data.post;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

const initialState = {
  fetch: {
    data: [],
    loading: false,
  },
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 1,
    total: null,
  },
  detail: {
    data: null,
    loading: false,
  },
  likeLoading: false,
};
const groupPostsSlice = createSlice({
  name: "groupPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupPosts.fulfilled, (state, action) => {
        state.fetch.loading = false;
        state.fetch.data = [...state.fetch.data, ...action.payload.data];
        state.pagination = {
          current_page: action.payload.current_page + 1,
          last_page: action.payload.last_page,
          per_page: action.payload.per_page,
          total: action.payload.total,
        };
      })
      .addCase(likeGroupPost.fulfilled, (state, action) => {
        state.likeLoading = false;
        state.fetch.data = state.fetch.data.map((post) => {
          if (post.id === action.payload.post.id) {
            return {
              ...post,
              is_liked: action.payload.post.is_liked,
              liked_users_count: action.payload.post.liked_users_count,
            };
          }
          return post;
        });
      })
      .addCase(fetchGroupPostDetail.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.data = action.payload;
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchGroupPosts":
            state.fetch.loading = false;
            break;
          case "likeGroupPost":
            state.likeLoading = false;
            break;
          case "fetchGroupPostDetail":
            state.detail.loading = false;
            break;
          default:
            break;
        }
      })
      .addMatcher(isPending, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchGroupPosts":
            state.fetch.loading = true;
            break;
          case "likeGroupPost":
            state.likeLoading = true;
            break;
          case "fetchGroupPostDetail":
            state.detail.loading = true;
            break;
          default:
            break;
        }
      });
  },
});
// export const {} = groupPostsSlice.actions;
export default groupPostsSlice.reducer;
