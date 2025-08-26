import { toast } from "react-toastify";
import { api } from "../../Services/axios_instance";

/*
  |-------------------------------------------------------------------------
  | CREATE POST
  |--------------------------------------------------------------------------
  */
export const __CREATE_POST__ = (form) => {
  return async (dispatch) => {
    console.log("Creating post...", form);
    dispatch({ type: "CREATE_POST_REQUEST" });
    try {
      const response = await api.post("/posts", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("POST API RESPONSE", response);
      toast.success("Post created successfully!");
      window.location.href = "/feed";
      dispatch({ type: "CREATE_POST_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "CREATE_POST_FAILURE",
        payload: error.response.data?.errors,
      });
    }
  };
};

/*
  |-------------------------------------------------------------------------
  | FETCH MANY POST
  |--------------------------------------------------------------------------
  */
export const __FETCH_POSTS__ = (perPage, page, category, isFetching) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_POSTS_REQUEST" });
    console.log("fetching posts");

    try {
      const response = await api.get("/posts/" + category, {
        params: {
          perPage,
          page,
        },
      });
      console.log(response);
      dispatch({
        type: "FETCH_POSTS_SUCCESS",
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_POSTS_FAILURE",
        payload: error.response.data?.errors,
      });
    } finally {
      if (isFetching.current) {
        isFetching.current = false;
      }
    }
  };
};

export const __FETCH_SPECIFIC_POST__ = (id) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_SPECIFIC_POST_REQUEST" });
    try {
      const response = await api.get(`/posts/${id}`);
      dispatch({
        type: "FETCH_SPECIFIC_POST_SUCCESS",
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_SPECIFIC_POST_FAILURE",
        payload: error.response.data?.errors,
      });
    }
  };
};
export const __EDIT_POST__ = (id, form) => {
  return async (dispatch) => {
    console.log(form);

    dispatch({ type: "EDIT_POST_REQUEST" });
    try {
      const response = await api.post(`/posts/edit/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "EDIT_POST_SUCCESS",
        payload: response.data.data,
      });
      toast.success("Post updated successfully!");
      window.location.href = "/feed";
    } catch (error) {
      dispatch({
        type: "EDIT_POST_FAILURE",
        payload: error.response.data?.errors,
      });
    }
  };
};
