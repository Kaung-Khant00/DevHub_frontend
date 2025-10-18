import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance";

export const fetchAdmins = createAsyncThunk("admin/fetchAdmins", async ({ page = 1, perPage }, { rejectWithValue }) => {
  try {
    const response = await api.get("/super_admin/admins", {
      params: {
        page,
        perPage,
      },
    });
    console.log("SUPER SUPER ADMIN ADMIN", response);

    return response.data.admins;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});
export const createAdmin = createAsyncThunk("admin/createAdmin", async ({ form, officeImage }, { rejectWithValue }) => {
  try {
    const response = await api.post(
      "/super_admin/admins/create",
      { ...form, officeImage },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log("createAdmin", err.response.data.errors);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});
export const editAdminById = createAsyncThunk(
  "admin/editAdminById",
  async ({ id, form, officeImage }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/super_admin/admins/edit/${id}`,
        { ...form, officeImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("EDIT ADMIN BY ID", response);
      return response.data;
    } catch (err) {
      console.log("EDIT ADMIN BY ID ERROR", err.response.data.errors);
      return rejectWithValue(err.response?.data?.errors || err.message);
    }
  }
);
export const fetchAdminById = createAsyncThunk("admin/fetchAdminById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/super_admin/admins/${id}`);
    console.log("FETCH ADMIN BY ID", response);

    return response.data.admin;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});

const initialState = {
  fetch: {
    data: [],
    loading: false,
  },
  create: {
    loading: false,
    updatingLoading: false,
    error: null,
  },
  detail: {
    data: null,
    loading: false,
  },
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 1,
    total: null,
  },
};
const adminAdminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.fetch.loading = false;
        state.fetch.data = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          per_page: action.payload.per_page,
          total: action.payload.total,
        };
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.create.loading = false;
        state.create.error = null;
      })
      .addCase(fetchAdminById.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.data = action.payload;
      })
      .addCase(editAdminById.fulfilled, (state) => {
        state.create.updatingLoading = false;
        state.create.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchAdmins":
            state.fetch.loading = false;
            state.fetch.error = action.payload;
            break;
          case "createAdmin":
            console.log("CREATE ADMIN ERROR", action.payload);
            state.create.loading = false;
            state.create.error = action.payload;
            break;
          case "fetchAdminById":
            state.detail.loading = false;
            state.detail.error = action.payload;
            break;
          case "editAdminById":
            state.create.updatingLoading = false;
            state.create.error = action.payload;
            break;
          default:
            break;
        }
      })
      .addMatcher(isPending, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "fetchAdmins":
            state.fetch.loading = true;
            state.fetch.error = null;
            break;
          case "createAdmin":
            state.create.loading = true;
            state.create.error = null;
            break;
          case "fetchAdminById":
            state.detail.loading = true;
            state.detail.error = null;
            break;
          case "editAdminById":
            state.create.updatingLoading = true;
            state.create.error = null;
            break;
          default:
            break;
        }
      });
  },
});
// export const {} = adminAdminsSlice.actions;
export default adminAdminsSlice.reducer;
