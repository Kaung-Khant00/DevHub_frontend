// postSlice.js
import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "../../Services/axios_instance";
import { followProfileUser, updateProfilePostLike } from "../user/userSlice";

/*
|------------------------------------------------------------------------
| CREATE POST
|------------------------------------------------------------------------
*/
export const createPost = createAsyncThunk("posts/createPost", async ({ form, navigate }, { rejectWithValue }) => {
  try {
    const response = await api.post("/posts", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    toast.success("Post created successfully!");
    navigate("/feed");
    return response.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

/*
|------------------------------------------------------------------------
| FETCH POSTS
|------------------------------------------------------------------------
*/
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ perPage = 10, page = 1, sortBy = "created_at,desc" } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts`, {
        params: { perPage, page, sortBy },
      });
      console.log(response);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

/*
|------------------------------------------------------------------------
| FETCH SPECIFIC POST
|------------------------------------------------------------------------
*/
export const fetchSpecificPost = createAsyncThunk("posts/fetchSpecificPost", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/posts/${id}`);
    console.log(response);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

/*
|------------------------------------------------------------------------
| EDIT POST
|------------------------------------------------------------------------
*/
export const editPost = createAsyncThunk("posts/editPost", async ({ id, form, navigate }, { rejectWithValue }) => {
  console.log(form);
  try {
    const response = await api.post(`/posts/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Post updated successfully!");
    navigate("/feed");
    console.log(response);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

/*
|------------------------------------------------------------------------
| DELETE POST
|------------------------------------------------------------------------
*/
export const deletePost = createAsyncThunk("posts/deletePost", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    console.log(response);
    toast.success(response.data.message);
    return response.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

/*
|------------------------------------------------------------------------
| LIKE POST
|------------------------------------------------------------------------
*/
export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ likeData, isInProfile = false }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/posts/like", likeData);
      console.log(response);
      if (isInProfile) {
        dispatch(updateProfilePostLike({ post: response.data.post, type: isInProfile }));
      }
      return response.data;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      return rejectWithValue();
    }
  }
);
export const likeDetailPost = createAsyncThunk("posts/likeDetailPost", async (likeData, { rejectWithValue }) => {
  try {
    const response = await api.post("/posts/like", likeData);
    console.log(response);
    return response.data.post;
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong!");
    return rejectWithValue();
  }
});

/*
|------------------------------------------------------------------------
| FETCH DETAIL POST
|------------------------------------------------------------------------
*/
export const fetchDetailPost = createAsyncThunk("posts/fetchDetailPost", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/posts/${id}/detail`);
    console.log(response);
    return response.data.post;
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong!");
    return rejectWithValue();
  }
});

/*
|------------------------------------------------------------------------
| COMMENT POST
|------------------------------------------------------------------------
*/
export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async ({ pagination, id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${id}/comments`, {
        params: pagination,
      });
      console.log(response);
      return response.data.comments;
    } catch (err) {
      toast.error("Unexpected Error happened while loading Post!");
      console.log(err);
      rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

/*
|------------------------------------------------------------------------
| FETCH COMMENTS OF THE POST
|------------------------------------------------------------------------
*/
export const commentPost = createAsyncThunk("posts/commentPost", async (commentData, { rejectWithValue }) => {
  try {
    const response = await api.post("/posts/comment", commentData);
    console.log(response);
    return response.data.comment;
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong!");
    return rejectWithValue();
  }
});

/*
|------------------------------------------------------------------------
| UPDATE COMMENT
|------------------------------------------------------------------------
*/
export const updateComment = createAsyncThunk("posts/updateComment", async ({ comment, id }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/posts/${id}/comment`, { comment });
    console.log(response);
    return response.data.comment;
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong!");
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});
/*
|------------------------------------------------------------------------
| DELETE COMMENT
|------------------------------------------------------------------------
*/
export const deleteComment = createAsyncThunk("posts/deleteComment", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/posts/${id}/comment`);
    console.log(response);
    toast.success("Comment deleted successfully!");
    return response.data;
  } catch (err) {
    console.log(err);
    toast.error("Couldn't delete comment!");
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

/*
|------------------------------------------------------------------------
| FOLLOW USER
|------------------------------------------------------------------------
*/
export const followUser = createAsyncThunk(
  "posts/followUser",
  async ({ userId, isInProfile = false }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get(`/user/${userId}/follow`);
      if (isInProfile) {
        dispatch(followProfileUser());
      }
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to follow user");
    }
  }
);

const initialState = {
  posts: [],
  pagination: {
    perPage: 2,
    page: 1,
    lastPage: null,
    sortBy: "created_at,desc",
    nextPageURL: null,
  },
  comment: {
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null,
    data: [],
    pagination: {
      perPage: 40,
      page: 1,
      lastPage: null,
      nextPageURL: null,
      sortBy: "created_at,desc",
    },
  },
  create: {
    loading: false,
    error: null,
  },
  fetch: {
    loading: false,
    error: null,
  },
  edit: {
    data: null,
    loading: false,
    error: null,
  },
  like: {
    loading: false,
    error: null,
  },
  detail: {
    likeLoading: false,
    data: null,
    loading: false,
  },
  delete: {
    loading: null,
    error: null,
  },
  follow: {
    loading: false,
    error: null,
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPosts(state) {
      Object.assign(state, initialState);
    },
    clearCreateError(state) {
      state.create.error = null;
    },
  },
  extraReducers: (builder) => {
    // CREATE POST
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [action.payload.post, ...state.posts];
        state.create.loading = false;
        state.create.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      })

      // FETCH POSTS
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetch.loading = false;
        state.fetch.error = null;
        state.posts = [...state.posts, ...action.payload.data.data];
        state.pagination = {
          perPage: action.payload.data.per_page,
          page: action.payload.data.current_page + 1,
          nextPageURL: action.payload.data.next_page_url,
          lastPage: action.payload.data.last_page,
          category: action.payload.data.category,
        };
      })

      // FETCH SPECIFIC POST

      .addCase(fetchSpecificPost.fulfilled, (state, action) => {
        state.edit.loading = false;
        state.edit.error = null;
        state.edit.data = action.payload;
      })
      .addCase(fetchSpecificPost.rejected, (state, action) => {
        state.edit.loading = false;
        state.edit.error = action.payload;
        state.edit.data = null;
      })

      // EDIT POST

      .addCase(editPost.fulfilled, (state, action) => {
        state.edit.loading = false;
        state.edit.error = null;
        state.posts = [action.payload, ...state.posts.filter((post) => post.id !== action.payload.id)];
      })
      .addCase(editPost.rejected, (state, action) => {
        state.edit.loading = false;
        state.edit.error = action.payload;
      })

      // DELETE POST

      .addCase(deletePost.fulfilled, (state, action) => {
        state.edit.loading = false;
        state.edit.error = null;
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.edit.loading = false;
        state.edit.error = action.payload;
      })

      // LIKE POST (Feed)

      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload.post;
        state.posts = state.posts.map((post) => {
          console.log(post.id);
          if (post.id === updatedPost.id) {
            console.log(post.id, "MATCHED");
            return { ...post, ...updatedPost };
          }
          return post;
        });
        state.like.loading = false;
        state.like.error = null;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.like.loading = false;
        state.like.error = action.payload;
      })

      // LIKE POST (Detail)

      .addCase(likeDetailPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return { ...post, ...action.payload };
          }
          return post;
        });
        state.detail.data = { ...state.detail.data, ...action.payload };
        state.detail.likeLoading = false;
      })
      .addCase(likeDetailPost.pending, (state) => {
        state.detail.likeLoading = true;
      })
      .addCase(likeDetailPost.rejected, (state) => {
        state.detail.likeLoading = false;
      })

      // FETCH DETAIL POST

      .addCase(fetchDetailPost.fulfilled, (state, action) => {
        state.detail.data = action.payload;
        state.detail.loading = false;
        state.comment.data = [];
        state.comment.pagination = {
          perPage: 10,
          page: 1,
          lastPage: 1,
          nextPageURL: null,
        };
      })
      .addCase(fetchDetailPost.pending, (state) => {
        state.detail.loading = true;
      })
      .addCase(fetchDetailPost.rejected, (state) => {
        state.detail.loading = false;
      })

      //FETCH COMMENTS
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comment.loading = false;
        state.comment.error = null;
        if (action.payload.current_page === 1) {
          state.comment.data = action.payload.data;
        } else {
          state.comment.data = [...state.comment.data, ...action.payload.data];
        }
        state.comment.pagination = {
          perPage: action.payload.per_page,
          page: action.payload.current_page + 1,
          lastPage: action.payload.last_page,
          nextPageURL: action.payload.next_page_url,
        };
      })

      //UPDATE COMMENT
      .addCase(updateComment.fulfilled, (state, action) => {
        state.comment.updateLoading = false;
        state.comment.data = [
          action.payload,
          ...state.comment.data.filter((comment) => comment.id !== action.payload.id),
        ];
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.comment.createLoading = false;
        state.detail.data.comments_count += 1;
        state.comment.data = [action.payload, ...state.comment.data];
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.post_id) {
            return { ...post, comments_count: post.comments_count + 1 };
          }
          return post;
        });
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comment.deleteLoading = false;
        state.detail.data.comments_count -= 1;
        state.comment.data = state.comment.data.filter((comment) => comment.id !== action.payload.id);
      });

    // FOLLOW USER
    builder
      .addCase(followUser.fulfilled, (state, action) => {
        state.follow.loading = false;
        state.posts = [
          ...state.posts.map((post) => {
            if (post.user_id == action.payload.id) {
              return { ...post, followed: action.payload.followed };
            }
            return post;
          }),
        ];
      })
      .addMatcher(isPending, (state, action) => {
        const type = action.type.split("/")[1];
        if (type.includes("createPost")) state.create.loading = true;
        if (type.includes("fetchPosts")) state.fetch.loading = true;
        if (type.includes("fetchSpecific") || type.includes("edit") || type.includes("delete"))
          state.edit.loading = true;
        if (type.includes("likePost")) state.like.loading = true;
        if (type.includes("fetchComments")) state.comment.loading = true;
        if (type.includes("updateComment")) state.comment.updateLoading = true;
        if (type.includes("commentPost")) state.comment.createLoading = true;
        if (type.includes("deleteComment")) state.comment.deleteLoading = true;
        if (type.includes("followUser")) state.follow.loading = true;
      })
      .addMatcher(isRejected, (state, action) => {
        const type = action.type.split("/")[1];

        if (type.includes("createPost")) {
          state.create.loading = false;
          state.create.error = action.payload;
        }

        if (type.includes("fetchPosts")) {
          state.fetch.loading = false;
          state.fetch.error = action.payload;
        }

        if (type.includes("fetchSpecific") || type.includes("edit") || type.includes("delete")) {
          state.edit.loading = false;
          state.edit.error = action.payload;
        }

        if (type.includes("likePost")) {
          state.like.loading = false;
          state.like.error = action.payload;
        }

        if (type.includes("fetchComments")) {
          state.comment.loading = false;
          state.comment.error = action.payload;
        }

        if (type.includes("updateComment")) {
          state.comment.updateLoading = false;
        }

        if (type.includes("commentPost")) {
          state.comment.createLoading = false;
        }

        if (type.includes("deleteComment")) {
          state.comment.deleteLoading = false;
        }

        if (type.includes("followUser")) {
          state.follow.loading = false;
          state.follow.error = action.payload;
        }
      });
  },
});

export const { resetPosts, clearCreateError } = postSlice.actions;
export default postSlice.reducer;
