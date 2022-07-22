import loginToggle from '@/context/loginContext';
import { Container, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  MouseEvent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import CreateBoardModal from '../createboard';
import LoginModal from '../login';
import RegisterModal from '../register';
import SettingsModal from '../settings';
import Navbar from './navbar';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { showLogin, toggleLogin } = useContext(loginToggle);
  const [openBoard, setOpenBoard] = useState(false);

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

  const onClickOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenBoard(true);
  };

  if (!session)
    return (
      <VStack
        w='full'
        minH={{
          base: 'auto',
          md: '100vh',
        }}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Spinner
          size={'xl'}
          thickness={'4px'}
          speed={'0.65s'}
          color={'gray.200'}
          backgroundColor={'transparent'}
        />
        <Text fontSize={'xl'}>Loading ...</Text>
      </VStack>
    );

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
      <CreateBoardModal
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

