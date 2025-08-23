const initialState = {
  user: {},
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOAD":
      return { ...state, loading: true, error: null };
    case "USER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "USER_FAILURE":
      return { ...state, loading: false, error: action.payload, token: null };

    default:
      return state;
  }
};
