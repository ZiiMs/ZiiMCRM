import loginToggle from '@/context/loginContext';
import { Container, HStack } from '@chakra-ui/react';
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
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./navbar'));
const SettingsModal = dynamic(() => import('@/components/Modals/Settings'));
const LoginModal = dynamic(() => import('@/components/Modals/Login'));
const RegisterModal = dynamic(() => import('@/components/Modals/Register'));
const PlusBoard = dynamic(() => import('@/components/Modals/PlusBoard'));

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { showLogin, toggleLogin } = useContext(loginToggle);
  const [openBoard, setOpenBoard] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session === null && !showLogin) {
      router.push('/');
      toggleLogin();
    } else if (session && showLogin) {
      toggleLogin();
    }
    return () => {};
  }, [router, session, showLogin, toggleLogin]);

  const onClickOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenBoard(true);
  };

  if (status === 'loading') return <Loading />;

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
      <PlusBoard
        open={openBoard}
        toggleOpen={() => {
          setOpenBoard(false);
        }}
      />
      <LoginModal />
      <RegisterModal />
      <HStack key={'layoutstack'} m={0} p={0} flex={1}>
        <Navbar openBoard={onClickOpen} />
        {children}
      </HStack>
    </Container>
  );
};

export default Layout;

