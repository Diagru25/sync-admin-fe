import { setupInterceptorsTo } from "apis/interceptors";
import axios from "axios";
import qs from "qs";

export const request = setupInterceptorsTo(
  axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
      "content-type": "application/json",
    },
    timeout: 60000,
    paramsSerializer: (params) => qs.stringify(params),
  })
);
