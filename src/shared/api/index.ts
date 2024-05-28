import axios, { Method } from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
});

export const refreshApi = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + Cookies.get("jwt_access");
  return config;
});

refreshApi.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Refresh " + Cookies.get("jwt_refresh");
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      const url = error.response.config.url;
      const method: Method = error.response.config.method;
      const errorData =
        error.response.config.data && JSON.parse(error.response.config.data);

      return refreshApi
        .post("/auth/refresh")
        .then((res) => res.data)
        .then((data) => {
          Cookies.set("jwt_access", data.accessToken);
          Cookies.set("jwt_refresh", data.refreshToken);

          return method === "get"
            ? api.get(url).then((res) => res)
            : api.post(url, errorData).then((res) => res);
        })
        .catch((e: Error) => {
          console.error(e);
        });
    }
  }
);
