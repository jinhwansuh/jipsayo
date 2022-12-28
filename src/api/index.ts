import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.defaults.headers['Content-Type'] = 'application/json';
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
