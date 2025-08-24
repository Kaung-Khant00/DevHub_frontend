import { toast } from "react-toastify";
import { api } from "../../Services/axios_instance";

export const __REGISTER__ = (form) => {
  return async (dispatch) => {
    dispatch({ type: "REQUEST_LOAD" });

    try {
      const response = await api.post("/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
        role: form.role,
      });
      toast.success("Registration successful!");
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "USER_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "USER_FAILURE",
        payload: error.response.data.errors,
      });
    }
  };
};
export const __LOGIN__ = (form) => {
  return async (dispatch) => {
    dispatch({ type: "REQUEST_LOAD" });

    try {
      const response = await api.post("/login", {
        email: form.email,
        password: form.password,
      });
      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "USER_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "USER_FAILURE",
        payload: error.response.data.errors,
      });
    }
  };
};
