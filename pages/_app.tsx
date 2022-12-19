import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence initial={false}>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}
