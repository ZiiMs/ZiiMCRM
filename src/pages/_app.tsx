import Layout from '@/components/layout';
import { ChakraProvider } from '@chakra-ui/react';
import { withTRPC } from '@trpc/next';
import { getSession, SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import theme from 'src/theme';
import superjson from 'superjson';
import { AppRouter } from '../server/routers';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      'cache-control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    );

    const url = `${getBaseUrl()}/api/trpc`;

    return {
      transformer: superjson, // optional - adds superjson serialization

      url,
      headers: {
        'X-Vercel-Secure': '1',
        'x-ssr': '1',
      },
    };
  },
  ssr: true,
})(MyApp);

