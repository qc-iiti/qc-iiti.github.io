import type { AppProps } from 'next/app';
import '../styles/_Global.scss';
import '../styles/Header.scss'; 

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
