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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        transformer: superjson, // optional - adds superjson serialization
        url: '/api/trpc',
      };
    }
    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      'cache-control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    );

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

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

