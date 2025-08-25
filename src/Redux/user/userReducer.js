const initialState = {
  user: {
    loading: false,
    data: null,
  },
  token: localStorage.getItem("token") || null,
  loading: false,
  logoutLoading: false,

  error: null,
  loginError: null,
  registerError: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    /*
|________________________________________________________________
| LOADING
|________________________________________________________________
*/
    case "REQUEST_LOAD":
      return {
        ...state,
        loading: true,
        error: null,
        registerError: null,
        loginError: null,
      };
    case "USER_REQUEST":
      return {
        ...state,
        user: {
          loading: true,
          data: null,
        },
      };
    case "LOGOUT_REQUEST":
      return { ...state, logoutLoading: true };
    /*
|________________________________________________________________
| SUCCESS
|________________________________________________________________
*/
    case "LOGIN_REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "USER_SUCCESS":
      return {
        ...state,
        user: {
          data: action.payload,
          loading: false,
        },
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    /*
|________________________________________________________________
| FAILURE
|________________________________________________________________
*/
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        registerError: action.payload,
        token: null,
      };
    case "USER_FAILURE":
      return {
        ...state,
        user: {
          loading: false,
          data: null,
        },
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        loginError: action.payload,
        token: null,
      };
    case "LOGOUT_FAILURE":
      return { ...state, logoutLoading: false };
    default:
      return state;
  }
};
