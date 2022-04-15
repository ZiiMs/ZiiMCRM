import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider, useSession } from 'next-auth/react';
import theme from '@/theme';
import { SettingsToggleProvider } from 'src/context/settingsContext';
import Layout from 'src/components/layout';
import { LoginToggleProvider } from 'src/context/loginContext';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <LoginToggleProvider>
          <SettingsToggleProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SettingsToggleProvider>
        </LoginToggleProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;

