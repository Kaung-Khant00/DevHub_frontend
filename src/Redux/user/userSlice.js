import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "../../Services/axios_instance";
import { isRejected } from "@reduxjs/toolkit";

/*
|------------------------------------------------------------------------
| REGISTER USER
|------------------------------------------------------------------------
*/
export const registerUser = createAsyncThunk(
  "user/register",
  async (form, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
        role: form.role,
      });

      toast.success("Registration successful!");
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || { form: "Something went wrong" }
      );
    }
  }
);

/*
|------------------------------------------------------------------------
| LOGIN USER
|------------------------------------------------------------------------
*/
export const loginUser = createAsyncThunk(
  "user/login",
  async (form, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || { form: "Invalid credentials" }
      );
    }
  }
);

/*
|------------------------------------------------------------------------
| LOGOUT USER
|------------------------------------------------------------------------
*/
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/logout");
      localStorage.removeItem("token");
      toast.success(response.data?.message || "Logged out successfully");
      window.location.href = "/auth/login";
      return true;
    } catch (error) {
      toast.error("Logout failed");
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

/*
|------------------------------------------------------------------------
| FETCH USER
|------------------------------------------------------------------------
*/
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user");
      if (!response.data.role) {
        window.location.href = "/select/role";
      }
      return response.data;
    } catch {
      return rejectWithValue("Failed to load user");
    }
  }
);
/*
|------------------------------------------------------------------------
| FETCH USER PROFILE
|------------------------------------------------------------------------
*/
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile");
      return response.data.profile;
    } catch {
      toast.error("Something went wrong!");
      return rejectWithValue("Failed to load profile");
    }
  }
);
/*
|------------------------------------------------------------------------
| EDIT PROFILE
|------------------------------------------------------------------------
*/
export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("EDITNG", formData);
      const response = await api.post(
        `/profile/developer/edit/${formData.id}`,
        formData
      );
      toast.success("Profile updated successfully");
      window.location.href = "/profile";
      return response.data.profile;
    } catch (error) {
      toast.error("Something went wrong!");
      return rejectWithValue(
        error.response?.data?.errors || "Failed to edit profile"
      );
    }
  }
);

/*
|------------------------------------------------------------------------
| EDIT PROFILE IMAGE 
|------------------------------------------------------------------------
*/
export const editProfileImage = createAsyncThunk(
  "user/editProfileImage",
  async ({ image, setOpen }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/profile/developer/image/edit",
        { image },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Profile image updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Image upload failed");
      return rejectWithValue(
        error.response?.data?.errors || "Image upload failed"
      );
    } finally {
      setOpen(false);
    }
  }
);
/*
|------------------------------------------------------------------------
| REMOVE PROFILE IMAGE
|------------------------------------------------------------------------
*/
export const removeProfileImage = createAsyncThunk(
  "user/removeProfileImage",
  async (setOpen, { rejectWithValue }) => {
    try {
      const response = await api.delete("/profile/developer/image");
      toast.success("Profile image removed successfully");
      console.log(response);
      return response.data.profile;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      return rejectWithValue();
    } finally {
      setOpen(false);
    }
  }
);

/*
|------------------------------------------------------------------------
| GET USER POSTS
|------------------------------------------------------------------------
*/
export const fetchUserPosts = createAsyncThunk(
  "user/fetchUserPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile/posts");
      console.log(response);
      return response.data.posts;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to load user posts");
    }
  }
);

/*
|------------------------------------------------------------------------
| SEARCH POST AND ORDER POST IN PROFILE
|------------------------------------------------------------------------
*/
export const filterSortPosts = createAsyncThunk(
  "user/fetchUserPosts",
  async ({ searchQuery, sortBy }, { rejectWithValue }) => {
    try {
      const response = await api.post("/profile/posts/search", {
        searchQuery,
        sortBy,
      });
      console.log(response);
      return response.data.posts;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to load user posts");
    }
  }
);

/*
|------------------------------------------------------------------------
| FETCH DEVELOPER USER PROFILE (OTHERS) 
|------------------------------------------------------------------------
*/
export const fetchDeveloperProfile = createAsyncThunk(
  "user/fetchDeveloperProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profile/developer/${userId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to load developer profile");
    }
  }
);

/*
|------------------------------------------------------------------------
| INITIAL STATE
|------------------------------------------------------------------------
*/
const initialState = {
  user: null,
  profile: null,
  viewedProfileUser: {
    ///// this is the data field for other users
    profile: null,
    posts: null,
    user: null,
    loading: false,
  },
  userPosts: {
    data: null,
    loading: null,
  },
  token: localStorage.getItem("token") || null,
  deleteLoading: false,
  loading: false,
  logoutLoading: false,
  error: null,
  loginError: null,
  registerError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    updateProfilePostLike: (state, { payload }) => {
      console.log(payload);
      if (payload.type === "myProfile") {
        state.userPosts.data = state.userPosts.data?.map((post) => {
          if (post.id === payload.post.id) {
            return { ...post, ...payload.post };
          }
          return post;
        });
      } else if (payload.type === "othersProfile") {
        state.viewedProfileUser.posts = state.viewedProfileUser.posts?.map(
          (post) => {
            if (post.id === payload.post.id) {
              return { ...post, ...payload.post };
            }
            return post;
          }
        );
      }
    },
    followProfileUser: (state) => {
      const isFollowing = state.viewedProfileUser.user.isFollowing;
      state.viewedProfileUser.user.isFollowing =
        !state.viewedProfileUser.user.isFollowing;
      state.viewedProfileUser.user.followers_count += isFollowing ? -1 : 1;
    },
  },
  extraReducers: (builder) => {
    // --------------------
    // Explicit fulfilled handlers
    // --------------------
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.logoutLoading = false;
      state.user = null;
      state.token = null;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });

    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    builder.addCase(editProfileImage.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(removeProfileImage.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.deleteLoading = false;
    });

    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.userPosts.loading = false;
      state.userPosts.data = action.payload;
    });

    builder.addCase(fetchDeveloperProfile.fulfilled, (state, action) => {
      state.viewedProfileUser.loading = false;
      state.viewedProfileUser.profile = action.payload.profile;
      state.viewedProfileUser.posts = action.payload.posts;
      state.viewedProfileUser.user = action.payload.user;
    });
    // --------------------
    // Global pending matcher
    // --------------------
    builder.addMatcher(
      isPending(
        registerUser,
        loginUser,
        logoutUser,
        fetchUser,
        fetchUserProfile,
        editProfile,
        editProfileImage,
        removeProfileImage,
        fetchUserPosts,
        fetchDeveloperProfile
      ),
      (state, action) => {
        const actionName = action.type.split("/")[1];

        switch (actionName) {
          case "registerUser":
            state.loading = true;
            state.registerError = null;
            break;

          case "loginUser":
            state.loading = true;
            state.loginError = null;
            break;

          case "logoutUser":
            state.logoutLoading = true;
            break;

          case "fetchUser":
            state.loading = true;
            break;

          case "fetchUserProfile":
            state.loading = true;
            break;

          case "editProfile":
            state.loading = true;
            break;

          case "editProfileImage":
            state.loading = true;
            break;

          case "removeProfileImage":
            state.deleteLoading = true;
            break;

          case "fetchUserPosts":
            state.userPosts.loading = true;
            break;
          case "fetchDeveloperProfile":
            state.viewedProfileUser.loading = true;
            break;
          default:
            break;
        }
      }
    );

    // --------------------
    // Global rejected matcher
    // --------------------
    builder.addMatcher(
      isRejected(
        registerUser,
        loginUser,
        logoutUser,
        fetchUser,
        fetchUserProfile,
        editProfile,
        editProfileImage,
        removeProfileImage,
        fetchUserPosts
      ),
      (state, action) => {
        const actionName = action.type.split("/")[1];
        const payload = action.payload ?? action.error?.message ?? null;

        switch (actionName) {
          case "registerUser":
            state.loading = false;
            state.registerError = payload;
            break;

          case "loginUser":
            state.loading = false;
            state.loginError = payload;
            break;

          case "logoutUser":
            state.logoutLoading = false;
            break;

          case "fetchUser":
            state.loading = false;
            state.user = null;
            state.error = payload;
            break;

          case "fetchUserProfile":
            state.loading = false;
            state.profile = null;
            state.error = payload;
            break;

          case "editProfile":
            state.loading = false;
            state.error = payload;
            break;

          case "editProfileImage":
            state.loading = false;
            state.error = payload;
            break;

          case "removeProfileImage":
            state.deleteLoading = false;
            state.error = payload;
            break;

          case "fetchUserPosts":
            state.userPosts.loading = false;
            state.userPosts.data = state.userPosts.data ?? null;
            state.error = payload;
            break;
          case "fetchDeveloperProfile":
            state.viewedProfileUser.loading = false;
            state.viewedProfileUser.profile = null;
            state.viewedProfileUser.posts = null;
            state.viewedProfileUser.user = null;
            state.error = payload;
            break;
          default:
            // fallback generic handler
            state.loading = false;
            state.error = payload;
            break;
        }
      }
    );
  },
});

export const { setToken, updateProfilePostLike, followProfileUser } =
  userSlice.actions;
export default userSlice.reducer;
