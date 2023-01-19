import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { RecoilRoot } from 'recoil';
import 'remixicon/fonts/remixicon.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '~/styles/GlobalStyle';
import theme from '~/styles/theme';
import { defaultSEO } from '~/constants/seo';
import { DefaultLayout } from '~/layouts';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <DefaultLayout>
            <AnimatePresence mode='wait' initial={false}>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </DefaultLayout>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
