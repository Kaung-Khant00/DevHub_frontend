const initialState = {
  posts: [],
  pagination: {
    perPage: 2,
    page: 1,
    lastPage: null,
    category: "newest",
  },
  create: {
    loading: false,
    error: null,
  },
  fetch: {
    loading: false,
    error: null,
  },
  edit: {
    data: null,
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
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        fetch: {
          loading: true,
          error: null,
        },
      };
    case "FETCH_SPECIFIC_POST_REQUEST":
      return {
        ...state,
        edit: {
          loading: true,
          error: null,
        },
      };
    case "EDIT_POST_REQUEST":
      return {
        ...state,
        edit: {
          ...state.edit,
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
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        posts: [...state.posts, ...action.payload.data],
        pagination: {
          ...state.pagination,
          perPage: action.payload.per_page,
          page: action.payload.current_page + 1,
          nextPageURL: action.payload.next_page_url,
          lastPage: action.payload.last_page,
        },
        fetch: {
          loading: false,
          error: null,
        },
      };
    case "FETCH_SPECIFIC_POST_SUCCESS":
      return {
        ...state,
        edit: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case "EDIT_POST_SUCCESS":
      return {
        ...state,
        edit: {
          data: action.payload,
          loading: false,
          error: null,
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
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        fetch: {
          loading: false,
          error: action.payload,
        },
      };
    case "FETCH_SPECIFIC_POST_FAILURE":
      return {
        ...state,
        edit: {
          data: null,
          loading: false,
          error: action.payload,
        },
      };
    case "EDIT_POST_FAILURE":
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
