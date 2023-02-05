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

export const HOME_IMAGES = [
  { imageSrc: '/image/jipsayo0.PNG', pathTo: PAGE_ROUTE.HOME },
  {
    imageSrc: '/image/jipsayo1.PNG',
    pathTo: PAGE_ROUTE.RESEARCH_FIRST,
  },
  {
    imageSrc: '/image/jipsayo2.PNG',
    pathTo: PAGE_ROUTE.MAP,
  },
  {
    imageSrc: '/image/jipsayo3.PNG',
    pathTo: PAGE_ROUTE.RESEARCH_FIRST,
  },
  // {
  //   imageSrc:
  //     'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
  //   pathTo: PAGE_ROUTE.MAP,
  // },
] as const;
