// postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "../../Services/axios_instance";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ form, navigate }, { rejectWithValue }) => {
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
  }
);

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (
    { perPage = 10, page = 1, category = "newest", isFetchingRef = null } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/posts/${category}`, {
        params: { perPage, page },
      });
      console.log(response);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.errors || err.message);
    } finally {
      try {
        if (isFetchingRef.current) {
          isFetchingRef.current = false;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const fetchSpecificPost = createAsyncThunk(
  "posts/fetchSpecificPost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${id}`);
      console.log(response);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, form, navigate }, { rejectWithValue }) => {
    console.log(form);
    try {
      const response = await api.post(`/posts/edit/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Post updated successfully!");
      navigate("/feed");
      console.log(response);
      return response.data.post;
    } catch (err) {
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      console.log(response);
      toast.success(response.data.message);
      return response.data;
    } catch (err) {
      console.log(err);
      toast.error("You can't delete others posts!");
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);

const initialState = {
  posts: [],
  pagination: {
    perPage: 2,
    page: 1,
    lastPage: null,
    category: "newest",
    nextPageURL: null,
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
  delete: {
    loading: null,
    error: null,
  },
  error: null,
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
    builder
      .addCase(createPost.pending, (state) => {
        state.create.loading = true;
        state.create.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.create.loading = false;
        state.create.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      });

    // FETCH POSTS
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetch.loading = true;
        state.fetch.error = null;
      })
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
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetch.loading = false;
        state.fetch.error = action.payload;
      });

    // FETCH SPECIFIC POST
    builder
      .addCase(fetchSpecificPost.pending, (state) => {
        state.edit.loading = true;
        state.edit.error = null;
      })
      .addCase(fetchSpecificPost.fulfilled, (state, action) => {
        state.edit.loading = false;
        state.edit.error = null;
        state.edit.data = action.payload;
      })
      .addCase(fetchSpecificPost.rejected, (state, action) => {
        state.edit.loading = false;
        state.edit.error = action.payload;
        state.edit.data = null;
      });

    // EDIT POST
    builder
      .addCase(editPost.pending, (state) => {
        state.edit.loading = true;
        state.edit.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.edit.loading = false;
        state.edit.error = null;
        state.posts = [
          action.payload,
          ...state.posts.filter((post) => post.id !== action.payload.id),
        ];
      })
      .addCase(editPost.rejected, (state, action) => {
        state.edit.loading = false;
        state.edit.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.edit.loading = true;
        state.edit.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.edit.loading = false;
        state.edit.error = null;
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.edit.loading = false;
        state.edit.error = action.payload;
      });
  },
});

export const { resetPosts, clearCreateError } = postSlice.actions;
export default postSlice.reducer;
