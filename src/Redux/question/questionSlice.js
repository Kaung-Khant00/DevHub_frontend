import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance.js";

// Async thunks
export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async (params, { rejectWithValue }) => {
  try {
    const response = await api.get("/questions", { params });
    console.log(response);
    return response.data.questions;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (questionData, { rejectWithValue }) => {
    try {
      const response = await api.post("/questions/ask", questionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Create question response:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/questions/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteQuestion = createAsyncThunk("questions/deleteQuestion", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/questions/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    fetch: {
      loading: false,
      data: [],
      sortBy: "created_at,desc",
      status: null,
    },
    create: {
      loading: false,
      errors: null,
    },
    pagination: {
      perPage: 3,
      page: 1,
      lastPage: null,
      sortBy: "created_at,desc",
    },
  },
  reducers: {
    setSelectedQuestion(state, action) {
      state.selected = action.payload;
    },
    clearSelectedQuestion(state) {
      state.selected = null;
    },
    changeStatus(state, action) {
      state.fetch.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fulfilled logic (specific)
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.fetch.loading = false;
        state.fetch.data = action.payload.data;
        state.pagination = {
          perPage: action.payload.per_page,
          page: action.payload.current_page,
          lastPage: action.payload.last_page,
        };
      })
      .addCase(createQuestion.fulfilled, (state) => {
        state.create.loading = false;
        state.create.errors = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.items.findIndex((q) => q.id === action.payload.question?.id || action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload.question || action.payload;
        }
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((q) => q.id !== action.payload);
      })
      // Generic loading matcher
      .addMatcher(isPending, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "createQuestion":
            state.create.loading = true;
            break;
          case "fetchQuestions":
            state.fetch.loading = true;
            break;
        }
      })
      // Generic error matcher
      .addMatcher(isRejected, (state, action) => {
        const actionName = action.type.split("/")[1];
        switch (actionName) {
          case "createQuestion":
            state.create.loading = false;
            state.create.errors = action.payload;
            break;
          case "fetchQuestions":
            state.fetch.loading = false;
            break;
        }
      });
  },
});

export const { setSelectedQuestion, clearSelectedQuestion, changeStatus } = questionSlice.actions;
export default questionSlice.reducer;
