import { PostResearchRequest, PostResearchResponse } from '~/types/research';
import axiosInstance from '.';

export const postResearch = (data: PostResearchRequest) => {
  // 수정 필요
  return axiosInstance.post<PostResearchResponse>('url', {
    data,
  });
};
