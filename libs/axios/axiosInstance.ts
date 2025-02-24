import { getCookie } from "@/utils";

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type ErrorResponse = {
  message: string;
  data?: any;
  status?: number;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceNamada = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_NAMADA,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleError = (error: ErrorResponse) => {
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const accessToken = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        retry: boolean;
      };

      // The request was made and the server responded with a 403 status code
      // which means access_token is expired, so we try to get a new access_token
      // from the refresh_token and retry request
      if (error.response.status === 403 && !originalRequest.retry) {
        originalRequest.retry = true;

        // const refreshToken = await getCookie('refresh_token');

        // if (refreshToken.password) {
        // }

        return axiosInstance(originalRequest);
      }

      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return handleError({
        message: error.message,
        status: error.response.status,
        data: error.response.data,
      });
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return handleError({
        message: `No response received (${error.message})`,
      });
    }
    // Something happened in setting up the request that triggered an Error
    return handleError({
      message: `Unknown error (${error.message})`,
    });
  },
);

export default axiosInstance;
