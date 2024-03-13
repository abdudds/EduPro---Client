import axios from 'axios'
import NotifySessionExpired from '../helper'

const BASE_URL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: localStorage.getItem("access-token")
      ? "Bearer " + localStorage.getItem("access-token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let userData = localStorage.getItem("logged_user");

    if (!config.headers["Authorization"] && userData) {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response.statusText === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === BASE_URL + "token/refresh/"
    ) {
      localStorage.clear();
      window.location.reload();
      NotifySessionExpired();
    }
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.data.messages[0].token_class === "AccessToken"
    ) {
      const refreshToken = localStorage.getItem("refresh-token");

      if (refreshToken) {
        return axiosInstance
          .post("token/refresh/", { refresh: refreshToken })
          .then((response) => {
            localStorage.setItem("access-token", response.data.access);
            localStorage.setItem("refresh-token", response.data.refresh);

            axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + response.data.access;
            originalRequest.headers["Authorization"] =
              "Bearer " + response.data.access;

            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            localStorage.clear();
            window.location.reload();
            NotifySessionExpired();
          });
      } else {
        localStorage.clear();
        window.location.reload();
        NotifySessionExpired();
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;

