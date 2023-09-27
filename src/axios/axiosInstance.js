import axios from "axios";
import { BASE_APP_URL } from "../constants";

const Api = axios.create({
  baseURL: BASE_APP_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Api;
