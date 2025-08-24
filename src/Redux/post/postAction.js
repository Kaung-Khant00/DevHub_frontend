import { toast } from "react-toastify";
import { api } from "../../Services/axios_instance";

/*
  |-------------------------------------------------------------------------
  | REGISTER
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
