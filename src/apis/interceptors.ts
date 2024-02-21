/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { LOGIN } from "routes/route.constant";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig | any => {
  //console.info(`[request] [${JSON.stringify(config)}]`);
  //   const token = localStorage.getItem(ACCESS_TOKEN);
  //   if (config.headers) config.headers = { x_access_token: `${token}` };
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  //console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> | any => {
  if (error.response?.status === 401) {
    const win: Window = window;
    win.location =
      window.location.protocol + "//" + window.location.host + LOGIN;
  }
  return Promise.reject(error.response);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
