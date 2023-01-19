import { FetchHouseRequest, FetchHouseResponse } from '~/types/house';
import axiosInstance from '.';

export const getHouse = (data: FetchHouseRequest) => {
  return axiosInstance.get<FetchHouseResponse>('/api/v1/houses', {
    params: {
      roadAddress: data.roadAddress,
      danjiName: data.danjiName,
    },
  });
};
