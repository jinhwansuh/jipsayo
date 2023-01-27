import {
  FetchFilteredResponse,
  FetchFilterRequest,
  FetchHouseRequest,
  FetchHouseResponse,
} from '~/types/house';
import axiosInstance from '.';

export const getHouse = (data: FetchHouseRequest) => {
  return axiosInstance.get<FetchHouseResponse>('/api/v1/houses', {
    params: {
      roadAddress: data.roadAddress,
      danjiName: data.danjiName,
    },
  });
};

export const getFilteredHouses = (data: FetchFilterRequest) => {
  const { latitude, longitude, cost, time } = data;
  return axiosInstance.get<FetchFilteredResponse>('/api/v1/houses/filter', {
    params: {
      latitude,
      longitude,
      cost,
      time,
      count: 500,
    },
  });
};
