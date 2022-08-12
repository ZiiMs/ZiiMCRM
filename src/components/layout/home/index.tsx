import { Box, VStack } from '@chakra-ui/react';
import {
  PropsWithChildren
} from 'react';

// import LoginModal from '@/components/login';
// import PlusBoard from '@/components/plusboard';
// import RegisterModal from '@/components/register';
// import SettingsModal from '@/components/settings';
// import Navbar from './navbar';
import {
  LoginModal, RegisterModal
} from '@/components/Modals';
import useLoginStore from '@/stores/loginStore';
import dynamic from 'next/dynamic';
import shallow from 'zustand/shallow';

const Navbar = dynamic(() => import('./navbar'));

const HomeLayout = ({ children }: PropsWithChildren<{}>) => {
  const { showLogin, toggleLogin } = useLoginStore(
    (state) => ({
      showLogin: state.showLogin,
      toggleLogin: state.toggleLogin,
    }),
    shallow
  );

  return (
    <Box
      w='100vw'
      minH={{
        base: 'auto',
        lg: '100vh',
      }}
      minW={'100vw'}
      display={'flex'}
      maxW='100%'
      m={0}
      p={0}
    >
      <LoginModal />
      <RegisterModal />

      <VStack key={'layoutstack'} minW={'100vw'} m={0} p={0} flex={1}>
        <Navbar />
        {children}
      </VStack>
    </Box>
  );
};

export default HomeLayout;

