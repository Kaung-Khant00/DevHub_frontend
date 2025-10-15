import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../../Services/axios_instance.js";
import { toast } from "react-toastify";

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
    toast.success("Message sent successfully!");
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
      return { ...response.data, sortBy: pagination.sortBy };
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
export const updateMessage = createAsyncThunk("questions/updateMessage", async ({ body, id }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/questions/${id}/message/edit`, { body });
    console.log(response);
    toast.success("Message updated successfully!");
    return response.data.data;
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong!");
    return rejectWithValue(err.response?.data?.errors || err.message);
  }
});
export const toggleQuestionLike = createAsyncThunk("questions/toggleQuestionLike", async (id, { rejectWithValue }) => {
  try {
    const response = await api.post(`/questions/${id}/question/like`);
    console.log("LIKED QUESTION", response);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const toggleMessageLike = createAsyncThunk("questions/toggleMessageLike", async (id, { rejectWithValue }) => {
  try {
    const response = await api.post(`/questions/${id}/message/like`);
    console.log("LIKED MESSAGE", response);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});
export const toggleMessageDislike = createAsyncThunk(
  "questions/toggleMessageDislike",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/questions/${id}/message/dislike`);
      console.log("DISLIKED MESSAGE", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const changeMessageType = createAsyncThunk("questions/changeMessageType", async (id, { rejectWithValue }) => {
  try {
    const response = await api.put(`/questions/${id}/message/changeType`);
    console.log("CHANGE MESSAGE TYPE", response);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});
export const deleteMessage = createAsyncThunk("questions/deleteMessage", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/questions/${id}/message`);
    toast.success("Message deleted successfully!");
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});
export const deleteQuestion = createAsyncThunk("questions/deleteQuestion", async ({ id }, { rejectWithValue }) => {
  try {
    await api.delete(`/questions/${id}/question`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});
export const toggleSolved = createAsyncThunk("questions/toggleSolved", async (id, { rejectWithValue }) => {
  try {
    const response = await api.post(`/questions/${id}/solved`);
    return response.data;
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
      deleteLoading: false,
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
      toggleSolvedLoading: false,
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
    likeLoading: false,
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
        console.log("CHECK", action.payload);
        state.messages[messagesKey] =
          state.fetch.sortBy === action.payload.sortBy || !action.payload.sortBy
            ? [...existing, ...incoming]
            : incoming;
        state.messages.type = payloadType;
        state.fetch.sortBy = action.payload.sortBy;
        state.messages.messageLoading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload.data;
        const messageKey = message.type === "comment" ? "comments" : "solutions";
        if (state.messages.type === "all") {
          state.messages.allMessages = [message, ...state.messages.allMessages];
        } else {
          state.messages[messageKey] = [message, ...state.messages[messageKey]];
        }
        state.create.loading = false;
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
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.messages.allMessages = state.messages.allMessages.map((message) => {
          if (message.id === action.payload.id) {
            return action.payload;
          }
          return message;
        });
        const messageKey = action.payload.type === "comment" ? "comments" : "solutions";
        state.messages[messageKey] = state.messages[messageKey].map((message) => {
          if (message.id === action.payload.id) {
            return action.payload;
          }
          return message;
        });
        state.create.loading = false;
        state.create.errors = null;
      })
      .addCase(toggleQuestionLike.fulfilled, (state, action) => {
        const idx = state.fetch.data.findIndex((q) => q.id === action.payload.question?.id);
        if (idx !== -1) {
          state.fetch.data[idx] = action.payload.question;
        }
        state.likeLoading = false;
      })
      .addCase(toggleMessageDislike.fulfilled, (state, action) => {
        const message = action.payload.data;
        const messageKey = message.type === "comment" ? "comments" : "solutions";
        state.messages[messageKey] = state.messages[messageKey].map((m) => {
          if (message.id === m.id) {
            return {
              ...message,
              disliked_by_user: action.payload.is_liked === "disliked" ? true : false,
              liked_by_user: action.payload.is_liked === "liked" ? true : false,
            };
          }
          return m;
        });
        state.messages.allMessages = state.messages.allMessages.map((m) => {
          if (message.id === m.id) {
            return {
              ...message,
              disliked_by_user: action.payload.is_liked === "disliked" ? true : false,
              liked_by_user: action.payload.is_liked === "liked" ? true : false,
            };
          }
          return m;
        });
      })
      .addCase(toggleMessageLike.fulfilled, (state, action) => {
        const message = action.payload.data;
        const messageKey = message.type === "comment" ? "comments" : "solutions";
        state.messages[messageKey] = state.messages[messageKey].map((m) => {
          if (message.id === m.id) {
            return {
              ...message,
              disliked_by_user: action.payload.is_liked === "disliked" ? true : false,
              liked_by_user: action.payload.is_liked === "liked" ? true : false,
            };
          }
          return m;
        });
        state.messages.allMessages = state.messages.allMessages.map((m) => {
          if (message.id === m.id) {
            return {
              ...message,
              disliked_by_user: action.payload.is_liked === "disliked" ? true : false,
              liked_by_user: action.payload.is_liked === "liked" ? true : false,
            };
          }
          return m;
        });
      })
      .addCase(changeMessageType.fulfilled, (state, action) => {
        const message = action.payload.data;
        state.messages.allMessages = state.messages.allMessages.map((m) => {
          if (m.id === message.id) {
            return {
              ...m,
              type: message.type,
            };
          }
          return m;
        });
        /*         const [firstKey, secondKey] =
          message.type === "comment" ? ["solutions", "comments"] : ["comments", "solutions"];
        state.messages[firstKey] = state.messages[firstKey].filter((m) => {
          if (m.id === message.id) {
            state.messages[secondKey] = [{ ...m, type: message.type }, ...state.messages[secondKey]];
            return false;
          }
          return true;
        }); */
        const messageKey = message.type === "comment" ? "solutions" : "comments";
        state.messages[messageKey] = state.messages[messageKey].filter((m) => {
          state.messages.commentPagination = {
            ...state.messages.commentPagination,
            page: 1,
            lastPage: null,
          };
          state.messages.solutionPagination = {
            ...state.messages.solutionPagination,
            page: 1,
            lastPage: null,
          };
          if (m.id === message.id) {
            return false;
          }
          return true;
        });
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const message = action.payload.data;
        const messageKey = message.type === "comment" ? "comments" : "solutions";
        state.messages[messageKey] = state.messages[messageKey].filter((m) => m.id !== message.id);
        state.messages.allMessages = state.messages.allMessages.filter((m) => m.id !== message.id);
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.fetch.deleteLoading = false;
        state.fetch.data = state.fetch.data.filter((question) => question.id !== action.payload.id);
      })
      .addCase(toggleSolved.fulfilled, (state, action) => {
        state.create.toggleSolvedLoading = false;
        state.fetch.data = state.fetch.data.map((question) => {
          if (question.id === action.payload.id) {
            return {
              ...question,
              is_solved: action.payload.is_solved,
            };
          }
          return question;
        });
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
            state.create.loading = true;
            break;
          case "fetchQuestionMessages":
            state.messages.messageLoading = true;
            break;
          case "updateMessage":
            state.create.loading = true;
            break;
          case "toggleQuestionLike":
            state.likeLoading = true;
            break;
          case "deleteQuestion":
            state.fetch.deleteLoading = true;
            break;
          case "toggleSolvedLoading":
            state.create.toggleSolvedLoading = true;
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
            state.create.loading = false;
            break;
          case "fetchQuestionMessages":
            state.messages.messageLoading = false;
            break;
          case "updateMessage":
            state.create.loading = false;
            state.create.errors = action.payload;
            break;
          case "toggleQuestionLike":
            state.likeLoading = false;
            break;
          case "deleteQuestion":
            state.fetch.deleteLoading = false;
            break;
          case "toggleSolvedLoading":
            state.create.toggleSolvedLoading = false;
            break;
        }
      });
  },
});

export const { setSelectedQuestion, clearSelectedQuestion, changeStatus, resetMessages } = questionSlice.actions;
export default questionSlice.reducer;
