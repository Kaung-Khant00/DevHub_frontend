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
export const fetchQuestionDetail = createAsyncThunk(
  "questions/fetchQuestionDetail",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/questions/${id}`);
      console.log("QUESTION DETAIL", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const sendMessage = createAsyncThunk("questions/sendMessage", async ({ id, ...data }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/questions/${id}/answer`, data);
    console.log("SEND MESSAGE", response);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});
export const fetchQuestionMessages = createAsyncThunk(
  "questions/fetchQuestionMessages",
  async ({ id, pagination }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/questions/${id}/messages`, {
        params: pagination,
      });
      console.log("QUESTION MESSAGES", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async ({ id, data }, { rejectWithValue }) => {
    console.log("REQUEST", data);
    try {
      const response = await api.post(`/questions/${id}/edit`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
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
    messages: {
      messageLoading: false,
      allMessages: [],
      comments: [],
      solutions: [],
      messagePagination: {
        perPage: 3,
        page: 1,
        lastPage: null,
      },
      commentPagination: {
        perPage: 3,
        page: 1,
        lastPage: null,
      },
      solutionPagination: {
        perPage: 3,
        page: 1,
        lastPage: null,
      },
      type: null,
    },
    create: {
      loading: false,
      errors: null,
      createCommentLoading: false,
    },
    detail: {
      loading: false,
      data: null,
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
    resetMessages(state) {
      state.messages.allMessages = [];
      state.messages.comments = [];
      state.messages.solutions = [];
      state.messages.messagePagination = {
        perPage: 3,
        page: 1,
        lastPage: null,
      };
      state.messages.commentPagination = {
        perPage: 3,
        page: 1,
        lastPage: null,
      };
      state.messages.solutionPagination = {
        perPage: 3,
        page: 1,
        lastPage: null,
      };
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
      .addCase(fetchQuestionDetail.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.data = action.payload.question;
        state.create.commentLoading = false;
      })
      .addCase(fetchQuestionMessages.fulfilled, (state, action) => {
        const payloadType = action.payload.type;
        const [paginationKey, messagesKey] =
          payloadType === "comment"
            ? ["commentPagination", "comments"]
            : payloadType === "solution"
            ? ["solutionPagination", "solutions"]
            : ["messagePagination", "allMessages"];

        state.messages[paginationKey] = {
          perPage: action.payload.messages.per_page,
          page: action.payload.messages.current_page,
          lastPage: action.payload.messages.last_page,
        };
        const incoming = action.payload.messages.data ?? [];
        const existing = state.messages[messagesKey] ?? [];

        state.messages[messagesKey] = [...existing, ...incoming];
        state.messages.type = payloadType;
        state.messages.messageLoading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        if (!state.messages.type || state.messages.type === action.payload.message.type) {
          state.messages.messages = [action.payload.message, ...state.messages.messages];
        }
        state.create.createCommentLoading = false;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.errors = null;
        const idx = state.fetch.data.findIndex((q) => q.id === action.payload.question?.id || action.payload.id);
        if (idx !== -1) {
          state.fetch.data[idx] = action.payload.question || action.payload;
          state.detail.data = action.payload.question || action.payload;
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
          case "updateQuestion":
            state.create.loading = true;
            break;
          case "fetchQuestions":
            state.fetch.loading = true;
            break;
          case "fetchQuestionDetail":
            state.detail.loading = true;
            break;
          case "sendMessage":
            state.create.createCommentLoading = true;
            break;
          case "fetchQuestionMessages":
            state.messages.messageLoading = true;
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
          case "updateQuestion":
            state.create.loading = false;
            state.create.errors = action.payload;
            break;
          case "fetchQuestions":
            state.fetch.loading = false;
            break;
          case "fetchQuestionDetail":
            state.detail.loading = false;
            break;
          case "sendMessage":
            state.create.createCommentLoading = false;
            break;
          case "fetchQuestionMessages":
            state.messages.messageLoading = false;
            break;
        }
      });
  },
});

export const { setSelectedQuestion, clearSelectedQuestion, changeStatus, resetMessages } = questionSlice.actions;
export default questionSlice.reducer;
