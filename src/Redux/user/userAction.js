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

      dispatch({ type: "LOGIN_REGISTER_SUCCESS", payload: response.data });
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

      dispatch({ type: "LOGIN_REGISTER_SUCCESS", payload: response.data });
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
| LOGOUT (AUTHENTICATED)
|--------------------------------------------------------------------------
*/
export const __LOGOUT__ = () => {
  return async (dispatch) => {
    dispatch({ type: "LOGOUT_REQUEST" });

    try {
      const response = await api.post("/logout");

      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT_SUCCESS" });
      window.location.href = "/auth/login";
      toast.success(response.data?.message || "Logged out successfully");
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE" });
      console.log(error);

      toast.error("Logout failed");
    }
  };
};

/*
|-------------------------------------------------------------------------
| GET USER (AUTHENTICATED)
|--------------------------------------------------------------------------
*/
export const __GET_USER__ = () => {
  return async (dispatch) => {
    dispatch({ type: "USER_REQUEST" });
    try {
      const response = await api.get("/user");
      console.log(response);
      if (!response.data.role) {
        window.location.href = "/select/role";
      }
      dispatch({ type: "USER_SUCCESS", payload: response.data });
    } catch (error) {
      console.log("Logout", error);
      dispatch({
        type: "USER_FAILURE",
      });
    }
  };
};

/*
|-------------------------------------------------------------------------
| GET USER DATA IN DETAIL
|--------------------------------------------------------------------------
*/
export const __GET_USER_PROFILE__ = () => {
  return async (dispatch) => {
    dispatch({ type: "PROFILE_REQUEST" });
    try {
      const response = await api.get("/profile");
      console.log("PROFILE DATA -->", response);

      dispatch({ type: "PROFILE_SUCCESS", payload: response.data.profile });
    } catch (error) {
      console.log("Get User Profile", error);
      toast.error("Something went wrong !");
      dispatch({
        type: "PROFILE_FAILURE",
      });
    }
  };
};
/*
|-------------------------------------------------------------------------
| EDIT PROFILE
|--------------------------------------------------------------------------
*/
export const __EDIT_PROFILE__ = (formData) => {
  return async (dispatch) => {
    dispatch({ type: "PROFILE_EDIT_REQUEST" });
    try {
      const response = await api.post("/profile/developer/edit", formData);
      dispatch({
        type: "PROFILE_EDIT_SUCCESS",
        payload: response.data.profile,
      });
      toast.success("Profile updated successfully");
      window.location.href = "/profile";
    } catch (error) {
      console.log("Edit Profile", error);
      toast.error("Something went wrong !");
      dispatch({
        type: "PROFILE_EDIT_FAILURE",
        payload: error.response.data?.errors,
      });
    }
  };
};
/*
|-------------------------------------------------------------------------
| SET TOKEN (AFTER OAUTH)
|--------------------------------------------------------------------------
*/
export const __SET_TOKEN__ = (token) => {
  return async (dispatch) => {
    dispatch({ type: "SET_TOKEN", payload: token });
  };
};
