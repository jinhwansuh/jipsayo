import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { RecoilRoot } from 'recoil';
import 'remixicon/fonts/remixicon.css';
import { ThemeProvider } from 'styled-components';
import { GoogleAnalytics } from '~/components/common';
import GlobalStyle from '~/styles/GlobalStyle';
import theme from '~/styles/theme';
import { defaultSEO } from '~/constants/seo';
import '../src/styles/font.css';
import '../src/styles/infoOverlay.css';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <GoogleAnalytics />
      <DefaultSeo {...defaultSEO} />
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AnimatePresence mode='wait' initial={false}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
