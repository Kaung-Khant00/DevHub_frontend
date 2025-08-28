import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    console.log(error);

    if (
      status === 401 &&
      !url.includes("/login") &&
      !url.includes("/register")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    } else {
      console.error("API error:", error);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as api };
