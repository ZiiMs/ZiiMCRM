import loginToggle from '@/context/loginContext';
import { Container, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PropsWithChildren, useContext, useEffect } from 'react';
import LoginModal from '../login';
import RegisterModal from '../register';
import SettingsModal from '../settings';
import Navbar from './navbar';

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
  }, [router, session, showLogin, toggleLogin]);

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

