import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance.js";

// Async thunks
export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async (params, { rejectWithValue }) => {
  try {
    const response = await api.get("/questions", { params });
    return response.data;
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
    create: {
      loading: false,
      errors: null,
    },
  },
  reducers: {
    setSelectedQuestion(state, action) {
      state.selected = action.payload;
    },
    clearSelectedQuestion(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fulfilled logic (specific)
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.questions || action.payload;
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
        }
      });
  },
});

export const { setSelectedQuestion, clearSelectedQuestion } = questionSlice.actions;
export default questionSlice.reducer;
