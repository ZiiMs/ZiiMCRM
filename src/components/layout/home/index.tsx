import loginToggle from '@/stores/loginStore';
import { Box, Container, HStack, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  MouseEvent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';

import Loading from '@/components/loading';
// import LoginModal from '@/components/login';
// import PlusBoard from '@/components/plusboard';
// import RegisterModal from '@/components/register';
// import SettingsModal from '@/components/settings';
// import Navbar from './navbar';
import useLoginStore from '@/stores/loginStore';
import dynamic from 'next/dynamic';
import shallow from 'zustand/shallow';

const Navbar = dynamic(() => import('./navbar'));
const SettingsModal = dynamic(() => import('@/components/Modals/Settings'));
const LoginModal = dynamic(() => import('@/components/Modals/Login'));
const RegisterModal = dynamic(() => import('@/components/Modals/Register'));
const PlusBoard = dynamic(() => import('@/components/Modals/PlusBoard'));

const HomeLayout = ({ children }: PropsWithChildren<{}>) => {
  const { showLogin, toggleLogin } = useLoginStore(
    (state) => ({
      showLogin: state.showLogin,
      toggleLogin: state.toggleLogin,
    }),
    shallow
  );

  const { data: session } = useSession();

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
      <LoginModal />
      <RegisterModal />

      <VStack key={'layoutstack'} m={0} p={0} flex={1}>
        <Navbar />
        {children}
      </VStack>
    </Container>
  );
};

export default HomeLayout;

