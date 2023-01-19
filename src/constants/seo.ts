import { DefaultSeoProps } from 'next-seo';

const BASE_URL = 'https://jipsayo.vercel.app/';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | 집사요~',
  description: '집을 언제 살 수 있는지 계산해 보기',
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
    // images: [
    //   {
    //     url: '카카오톡, 페이스북에에 링크 넣으면 올라올 이미지',
    //     width: 285,
    //     height: 167,
    //     alt: '이미지',
    //   },
    // ],
  },
};
