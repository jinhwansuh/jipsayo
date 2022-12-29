import { PostResearchRequest, PostResearchResponse } from '~/types/research';
import axiosInstance from '.';

export const postResearch = (data: PostResearchRequest) => {
  return axiosInstance.post<PostResearchResponse>('/api/v1/research', data);
};
