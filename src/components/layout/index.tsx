import { Box, Container, Flex, HStack, Menu, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useContext, useEffect } from 'react';
import loginToggle from '@/context/loginContext';
import LoginModal from '../login';
import SettingsModal from '../settings';
import Navbar from './navbar';
import RegisterModal from '../register';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { showLogin, toggleLogin } = useContext(loginToggle);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session === null && !showLogin) {
      router.push('/');
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
      <RegisterModal />
      <HStack key={'layoutstack'} m={0} p={0} flex={1}>
        <Navbar />
        {children}
      </HStack>
    </Container>
  );
};

export default Layout;

