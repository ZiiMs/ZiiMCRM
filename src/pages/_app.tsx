import Layout from '@/components/layout';
import { BoardProvider } from '@/context/boardsContext';
import { LoginToggleProvider } from '@/context/loginContext';
import { RegisterToggleProvider } from '@/context/registerContext';
import { SettingsToggleProvider } from '@/context/settingsContext';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import theme from 'src/theme';

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

export default MyApp;

