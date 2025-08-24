const initialState = {
  user: {},
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
    case "LOGOUT_REQUEST":
      return { ...state, logoutLoading: true };
    /*
|________________________________________________________________
| SUCCESS
|________________________________________________________________
*/
    case "USER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT_SUCCESS":
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
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
