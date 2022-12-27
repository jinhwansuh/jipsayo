import axios from 'axios';

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = API_END_POINT;
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
