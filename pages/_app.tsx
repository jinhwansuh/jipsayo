import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '~/styles/GlobalStyle';
import { theme } from '~/styles/theme';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
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
