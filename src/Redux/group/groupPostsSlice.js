import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const fetchGroupPosts = createAsyncThunk(
  "admin/fetchGroupPosts",
  async ({ current_page = 1, per_page, group_id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/groups/posts/${group_id}`, {
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
      const response = await api.get(`/groups/posts/${postId}/detail`);
      console.log("GROUP POST DETAIL", response);
      return response.data.post;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
export const createGroupPostComment = createAsyncThunk(
  "groupPost/createGroupPostComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/groups/posts/${postId}/comments`, { comment });
      console.log(response);
      return response.data.comment;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
export const fetchGroupPostComments = createAsyncThunk(
  "groupPost/fetchGroupPostComments",
  async ({ pagination, postId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`groups/posts/${postId}/comments`, {
        params: {
          per_page: pagination.per_page,
          page: pagination.current_page,
        },
      });
      console.log("GROUP POST COMMENTS !!!", response);
      return response.data.comments;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateGroupPostComment = createAsyncThunk(
  "groupPost/updateGroupPostComment",
  async ({ commentId, comment }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/groups/posts/${commentId}/comments`, { comment });
      console.log(response);
      return response.data.comment;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
export const deleteGroupPostComment = createAsyncThunk(
  "groupPost/deleteGroupPostComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/groups/posts/${commentId}/comments`);
      console.log(response);
      return response.data.id;
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
  comment: {
    data: [],
    error: {},
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: null,
    },
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
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
              liked: action.payload.liked,
              liked_users_count: action.payload.post.liked_users_count,
            };
          }
          return post;
        });
        if (state.detail.data?.id === action.payload.post.id) {
          state.detail.data.liked = action.payload.liked;
          state.detail.data.liked_users_count = action.payload.post.liked_users_count;
        }
      })
      .addCase(fetchGroupPostDetail.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.data = action.payload;
      })
      .addCase(createGroupPostComment.fulfilled, (state, action) => {
        state.comment.createLoading = false;
        state.comment.data = [action.payload, ...state.comment.data];
      })
      .addCase(fetchGroupPostComments.fulfilled, (state, action) => {
        state.comment.data = [...state.comment.data, ...action.payload.data];
        state.comment.loading = false;
        state.comment.pagination = {
          ...state.comment.pagination,
          current_page: action.payload.current_page + 1,
          last_page: action.payload.last_page,
          per_page: action.payload.per_page,
          total: action.payload.total,
        };
      })
      .addCase(updateGroupPostComment.fulfilled, (state, action) => {
        state.comment.updateLoading = false;
        state.comment.data = state.comment.data.map((comment) => {
          if (comment.id === action.payload.id) {
            return action.payload;
          }
          return comment;
        });
      })
      .addCase(deleteGroupPostComment.fulfilled, (state, action) => {
        state.comment.deleteLoading = false;
        state.comment.data = state.comment.data.filter((comment) => comment.id !== action.payload);
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
          case "createGroupPostComment":
            state.comment.createLoading = false;
            state.comment.error = action.payload;
            break;
          case "fetchGroupPostComments":
            state.comment.loading = false;
            break;
          case "updateGroupPostComment":
            state.comment.updateLoading = false;
            state.comment.error = action.payload;
            break;
          case "deleteGroupPostComment":
            state.comment.deleteLoading = false;
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
          case "createGroupPostComment":
            state.comment.createLoading = true;
            break;
          case "fetchGroupPostComments":
            state.comment.loading = true;
            break;
          case "updateGroupPostComment":
            state.comment.updateLoading = true;
            break;
          case "deleteGroupPostComment":
            state.comment.deleteLoading = true;
            break;
          default:
            break;
        }
      });
  },
});
// export const {} = groupPostsSlice.actions;
export default groupPostsSlice.reducer;
