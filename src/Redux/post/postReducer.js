const initialState = {
  posts: [],
  create: {
    loading: false,
    error: null,
  },
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    /*
|________________________________________________________________
| LOADING
|________________________________________________________________
*/
    case "CREATE_POST_REQUEST":
      return {
        ...state,
        create: {
          loading: true,
          error: null,
        },
      };
    /*
|________________________________________________________________
| SUCCESS
|________________________________________________________________
*/
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        create: {
          loading: false,
        },
      };
    /*
|________________________________________________________________
| FAILURE
|________________________________________________________________
*/
    case "CREATE_POST_FAILURE":
      return {
        ...state,
        create: {
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
