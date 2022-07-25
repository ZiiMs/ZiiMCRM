import Layout from '@/components/layout';
import { BoardProvider } from '@/context/boardsContext';
import { LoginToggleProvider } from '@/context/loginContext';
import { RegisterToggleProvider } from '@/context/registerContext';
import { SettingsToggleProvider } from '@/context/settingsContext';
import { ChakraProvider } from '@chakra-ui/react';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import theme from 'src/theme';
import superjson from 'superjson';
import { AppRouter } from '../server/routers';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <LoginToggleProvider>
          <RegisterToggleProvider>
            <SettingsToggleProvider>
              <BoardProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </BoardProvider>
            </SettingsToggleProvider>
          </RegisterToggleProvider>
        </LoginToggleProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      transformer: superjson,
      url,

      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);

