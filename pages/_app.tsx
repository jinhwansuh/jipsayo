import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { RecoilRoot } from 'recoil';
import 'remixicon/fonts/remixicon.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '~/styles/GlobalStyle';
import theme from '~/styles/theme';
import { DefaultLayout } from '~/layouts';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta name='description' content='my sweet home' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

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
