import { Container, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MouseEvent, PropsWithChildren, useEffect, useState } from 'react';

import Loading from '@/components/loading';
// import LoginModal from '@/components/login';
// import PlusBoard from '@/components/plusboard';
// import RegisterModal from '@/components/register';
// import SettingsModal from '@/components/settings';
// import Navbar from './navbar';
import {
  LoginModal,
  PlusBoard,
  RegisterModal,
  SettingsModal
} from '@/components/Modals';
import useLoginStore from '@/stores/loginStore';
import { trpc } from '@/utils/trpc';
import dynamic from 'next/dynamic';
import shallow from 'zustand/shallow';

const Navbar = dynamic(() => import('./navbar'));

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { showLogin, toggleLogin } = useLoginStore(
    (state) => ({
      showLogin: state.showLogin,
      toggleLogin: state.toggleLogin,
    }),
    shallow
  );
  const [openBoard, setOpenBoard] = useState(false);

  const client = trpc.useContext();

  const router = useRouter();
  const { data: session, status } = useSession();

  const { data: boards, isLoading } = trpc.useQuery(['boards.fetch']);

  useEffect(() => {
    if (session === null && !showLogin) {
      router.push('/');
    }

    return () => {};
  }, [router, session, showLogin, toggleLogin]);

  const onClickOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenBoard(true);
  };

  if (isLoading) return <Loading />;
  // if (status === 'loading') return <Loading />;

  return (
    <Container
      w='full'
      minH={{
        base: 'auto',
        lg: '100vh',
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
      <HStack key={'layoutstack'} m={0} p={0} display={'flex'} flex={1}>
        <Navbar openBoard={onClickOpen} placeholderBoards={boards} />
        {children}
      </HStack>
    </Container>
  );
};

export default Layout;

