import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '~/styles/GlobalStyle';
import { theme } from '~/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AnimatePresence initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}
