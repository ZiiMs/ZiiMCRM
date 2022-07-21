import settingsToggle from '@/context/settingsContext';
import useBoards from '@/utils/swrFuncs';
import {
  Avatar,
  Box,
  Button,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  VStack,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useContext, useEffect } from 'react';
import { BiMenuAltLeft, BiPlus } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { RiSettings3Line } from 'react-icons/ri';
import BrandIconButton from '../iconButton';

interface INavbarProps {
  openBoard: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Navbar = ({ openBoard }: any) => {
  const { showSettings, toggleSettings } = useContext(settingsToggle);
  // const { boards, setBoards } = useContext(boardContext);
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id || '';

  const { boards, isLoading, error } = useBoards(userId);
  // const boards = [];
  const router = useRouter();
  useEffect(() => {
    console.log('data2', boards);
  }, [boards]);

  // const pathName = router.pathname.split('/')[1];

  // useEffect(() => {
  //   if (!session) return;
  //   (async () => {
  //     console.log('Getting Data');
  //     const res = await fetch('/api/board/fetchBoards', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userId: session.user.id,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (data.error) {
  //       console.error(data.error);
  //     } else {
  //       console.log(data.message);
  //       console.log(data.boards);
  //       setBoards(data.boards);
  //     }
  //   })();

  //   return () => {
  //     console.log('clearing data');
  //     setBoards([]);
  //   };
  // }, [session, setBoards]);

  return (
    <VStack
      as={'nav'}
      justifyContent='space-between'
      alignItems={'center'}
      bgColor={'brand.800'}
      m={0}
      p={0}
      h='100vh'
    >
      <VStack spacing={2.5} pt={2.5} px={2} m={0}>
        <NextLink passHref href={'/'}>
          <BrandIconButton
            as={Link}
            size={'lg'}
            Color={router.pathname === '/' ? 'brand.100' : 'brand.400'}
            variant={router.pathname === '/' ? 'solid' : 'ghost'}
            aria-label={'index button'}
            icon={<BiMenuAltLeft />}
          />
        </NextLink>
        {(!isLoading && !error && boards !== undefined) > 0
          ? boards.map((board) => (
              <NextLink key={board.id} passHref href={`/dashboard/${board.id}`}>
                <Button
                  p={0}
                  size={'lg'}
                  color={
                    router.asPath === `/dashboard/${board.id}`
                      ? 'brand.100'
                      : 'brand.400'
                  }
                  variant={
                    router.asPath === `/dashboard/${board.id}`
                      ? 'solid'
                      : 'ghost'
                  }
                >
                  <Avatar
                    name={board.name}
                    size={'md'}
                    m={0}
                    backgroundColor={board.image ? 'transparent' : undefined}
                    p={0}
                    src={board.image ? board.image : undefined}
                  />
                </Button>
              </NextLink>
            ))
          : null}
        <BrandIconButton
          onClick={openBoard}
          size={'lg'}
          disabled={!user}
          Color={'brand.400'}
          variant={'ghost'}
          aria-label={'dashboard button'}
          icon={<BiPlus />}
        />
      </VStack>
      <VStack>
        <Menu placement='right'>
          <MenuButton
            as={Button}
            p={0}
            size={'lg'}
            disabled={!user}
            color={
              router.asPath === `/user/${encodeURIComponent(user?.id)}`
                ? 'brand.100'
                : 'brand.400'
            }
            variant={
              router.asPath === `/user/${encodeURIComponent(user?.id)}`
                ? 'solid'
                : 'ghost'
            }
          >
            {user?.image ? (
              <Avatar
                size={'sm'}
                m={0}
                backgroundColor={'transparent'}
                p={0}
                src={user?.image ? user.image : undefined}
              />
            ) : (
              <Icon as={CgProfile} />
            )}
          </MenuButton>
          <Portal>
            <MenuList>
              <NextLink passHref href={`/user/${encodeURIComponent(user?.id)}`}>
                <MenuItem>Profile</MenuItem>
              </NextLink>
              <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
            </MenuList>
          </Portal>
        </Menu>

        <Box pb={2.5} px={2} m={0}>
          <BrandIconButton
            as={Link}
            onClick={() => {
              toggleSettings();
            }}
            disabled={!user}
            Color={showSettings ? 'brand.100' : 'brand.400'}
            variant={showSettings ? 'solid' : 'ghost'}
            size={'lg'}
            aria-label={'settings button'}
            icon={<RiSettings3Line />}
          />
        </Box>
      </VStack>
    </VStack>
  );
};

export default Navbar;

