import axios, { AxiosRequestConfig } from 'axios';

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

const request = (config: AxiosRequestConfig) => {
  return axiosInstance(config);
};

export default request;
