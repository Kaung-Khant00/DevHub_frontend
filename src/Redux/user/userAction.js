import { toast } from "react-toastify";
import { api } from "../../Services/axios_instance";

/*
  |-------------------------------------------------------------------------
  | REGISTER
  |--------------------------------------------------------------------------
  */
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
        type: "REGISTER_FAILURE",
        payload: error.response?.data?.errors || {
          form: "Something went wrong",
        },
      });
    }
  };
};

/*
|-------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
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
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.errors || {
          form: "Invalid credentials",
        },
      });
    }
  };
};

/*
|-------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/
export const __LOGOUT__ = () => {
  return async (dispatch) => {
    dispatch({ type: "LOGOUT_REQUEST" });

    try {
      const response = await api.post("/logout");

      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT_SUCCESS" });

      toast.success(response.data?.message || "Logged out successfully");
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE" });
      console.log(error);

      toast.error("Logout failed");
    }
  };
};
