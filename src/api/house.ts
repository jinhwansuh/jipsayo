import { FetchHouseRequest, FetchHouseResponse } from '~/types/house';
import axiosInstance from '.';

export const getHouse = (data: FetchHouseRequest) => {
  return axiosInstance.get<{ data: FetchHouseResponse }>('/api/v1/houses', {
    params: {
      jibunAddress: data.jibunAddress,
    },
  });
};
