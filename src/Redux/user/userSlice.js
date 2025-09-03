import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "../../Services/axios_instance";

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
| INITIAL STATE
|------------------------------------------------------------------------
*/
const initialState = {
  user: null,
  profile: null,
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
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.logoutLoading = false;
      })

      // GET USER
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      // GET PROFILE
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.loading = false;
        state.profile = null;
      })

      // EDIT PROFILE
      .addCase(editProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // EDIT PROFILE IMAGE
      .addCase(editProfileImage.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(removeProfileImage.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.deleteLoading = true;
      })
      .addCase(removeProfileImage.pending, (state) => {
        state.deleteLoading = false;
      })
      .addCase(removeProfileImage.rejected, (state) => {
        state.deleteLoading = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts.loading = false;
        state.userPosts.data = action.payload;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPosts.loading = true;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.userPosts.loading = false;
      });
  },
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
