import { DefaultSeoProps } from 'next-seo';

const BASE_URL = 'https://jipsayo.com';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s |집사요~ ',
  defaultTitle: '집사요~',
  description: '원하는 집을 언제살수 있을지 계산하고, 찾아보자!',
  canonical: BASE_URL,
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    // {
    //   rel: 'manifest',
    //   href: '/manifest.json',
    // },
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    {
      name: 'keywords',
      content:
        '부동산, 아파트, real estate, 계산, 날짜 계산, 아파트 위치, 지도, 연봉, 저축, 인상률',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    title: '집사요~',
    images: [
      {
        url: 'https://github.com/jinhwansuh/jipsayo/blob/main/public/image/jipsayo0.PNG?raw=true',
        alt: 'image',
      },
    ],
    siteName: '집사요~',
  },
};
