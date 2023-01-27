export const API_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as const;

export const PAGE_ROUTE = {
  HOME: '/',
  RESEARCH_FIRST: '/research/1',
  RESEARCH_SECOND: '/research/2',
  RESULT: '/result',
  MAP: '/map',
} as const;

export const KAKAO_URL = {
  POSTCODE: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  MAP: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`,
  CENTER_IMAGE:
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
} as const;
