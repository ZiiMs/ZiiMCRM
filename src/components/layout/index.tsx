import { Box, Container, Flex, HStack, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useContext, useEffect } from 'react';
import loginToggle from '@/context/loginContext';
import LoginModal from '../login';
import SettingsModal from '../settings';
import Navbar from './navbar';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { showLogin, toggleLogin } = useContext(loginToggle);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Login!?/', session);
    if (session === null && !showLogin) {
      toggleLogin();
    } else if (session && showLogin) {
      toggleLogin();
    }
    return () => {};
  }, [session]);

  return (
    <Container
      w='full'
      minH={{
        base: 'auto',
        md: '100vh',
      }}
      display={'flex'}
      maxW='100%'
      m={0}
      p={0}
    >
      <SettingsModal />
      <LoginModal />
      <HStack key={'layoutstack'} m={0} p={0} flex={1}>
        <Navbar />
          {children}
      </HStack>
    </Container>
  );
};

export default Layout;

