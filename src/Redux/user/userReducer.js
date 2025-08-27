const initialState = {
  user: {
    loading: false,
    user: null,
    profile: null,
  },
  profileEdit: {
    loading: false,
    error: null,
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
          ...state.user,
          loading: true,
          user: null,
        },
      };
    case "PROFILE_REQUEST":
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    case "PROFILE_EDIT_REQUEST":
      return {
        ...state,
        profileEdit: {
          error: null,
          loading: true,
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
          ...state.user,
          user: action.payload,
          loading: false,
        },
      };
    case "PROFILE_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload,
          loading: false,
        },
      };
    case "PROFILE_EDIT_SUCCESS":
      return {
        ...state,
        profileEdit: {
          loading: false,
          error: null,
        },
        user: {
          ...state.user,
          profile: action.payload,
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
          user: null,
        },
      };
    case "PROFILE_FAILURE":
      return {
        ...state,
        user: {
          ...state.user,
          profile: null,
          loading: false,
        },
      };
    case "PROFILE_EDIT_FAILURE":
      return {
        ...state,
        profileEdit: {
          loading: false,
          error: action.payload,
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
