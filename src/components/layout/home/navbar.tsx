import useDrawerStore from '@/stores/drawerStore';
import {
  default as settingsToggle,
  default as useSettingsStore
} from '@/stores/settingsStore';
import { MAX_BOARDS } from '@/utils/config';
import { trpc } from '@/utils/trpc';
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useContext, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineDeviceHub } from 'react-icons/md';
import { RiSettings3Line } from 'react-icons/ri';
import shallow from 'zustand/shallow';
import BrandIconButton from '../../iconButton';

interface INavbarProps {
  openBoard: (e: MouseEvent<HTMLButtonElement>) => void;
}

const HomeNavBar = () => {
  // const { boards, setBoards } = useContext(boardContext);
  const { data: session, status } = useSession();
  const [showDrawer, setShowDrawer] = useState(false);
  const user = session?.user;
  const userId = user?.id;
  const toast = useToast();

  const router = useRouter();

  return (
    <HStack
      as={'nav'}
      justifyContent='space-between'
      alignItems={'center'}
      bgColor={'brand.800'}
      m={0}
      p={0}
      w='100vw'
    >
      <HStack
        px={2}
        py={4}
        spacing={12}
        alignItems={'center'}
        justify={'flex-start'}
        fontSize={'3xl'}
        fontStyle={'italic'}
        textColor={'whiteAlpha.800'}
      >
        <HStack spacing={1}>
          <Icon as={MdOutlineDeviceHub} />
          <Heading fontSize={'3xl'}>ZiiM.Dev</Heading>
        </HStack>
        <HStack
          spacing={4}
          fontSize={'xl'}
          fontStyle={'normal'}
          fontWeight={'medium'}
          textColor={'whiteAlpha.800'}
        >
          <HStack
            as={'button'}
            _hover={{
              cursor: 'pointer',
              textColor: 'brand.200',
            }}
            onClick={(e) => {
              e.preventDefault();
              setShowDrawer(true);
            }}
            spacing={0}
            px={3}
          >
            <Text textColor={'inherit'} mr={2}>
              Features
            </Text>
            <Icon as={BiChevronDown} />
          </HStack>
          <HStack
            as={'button'}
            _hover={{
              cursor: 'pointer',
              textColor: 'brand.200',
            }}
            spacing={0}
            px={3}
          >
            <Text textColor={'inherit'} mr={2}>
              Solutions
            </Text>
            <Icon as={BiChevronDown} />
          </HStack>
          <HStack
            as={'button'}
            _hover={{
              cursor: 'pointer',
              textColor: 'brand.200',
            }}
            spacing={0}
            px={3}
          >
            <Text textColor={'inherit'} mr={2}>
              Resources
            </Text>
            <Icon as={BiChevronDown} />
          </HStack>
          <HStack
            as={'button'}
            _hover={{
              cursor: 'pointer',
              textColor: 'brand.200',
            }}
            spacing={0}
            px={3}
          >
            <Text textColor={'inherit'} mr={2}>
              Support
            </Text>
            <Icon as={BiChevronDown} />
          </HStack>
        </HStack>
      </HStack>
      <HStack px={2}>
        {session && user ? (
          <Menu placement='bottom'>
            <MenuButton
              as={Button}
              p={0}
              size={'lg'}
              disabled={!user}
              color={
                router.asPath === `/user/${user?.id}`
                  ? 'brand.100'
                  : 'brand.400'
              }
              leftIcon={<BiChevronDown />}
              alignItems={'center'}
              justifyContent={'center'}
              variant={
                router.asPath === `/user/${user?.id}` ? 'solid' : 'ghost'
              }
            >
              {user?.image ? (
                <Avatar
                  size={'sm'}
                  m={0}
                  backgroundColor={'transparent'}
                  name={user.name ?? undefined}
                  p={0}
                  src={user?.image ? user.image : undefined}
                />
              ) : (
                <Icon as={CgProfile} />
              )}
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuGroup>
                  <NextLink passHref href={`/dashboard/`}>
                    <MenuItem>Dashboard</MenuItem>
                  </NextLink>
                  <NextLink passHref href={`/user/${user?.id}`}>
                    <MenuItem>Profile</MenuItem>
                  </NextLink>
                </MenuGroup>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    router.push('/');
                    signOut({ redirect: false });
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        ) : (
          <>
            <Button
              isLoading={status === 'loading'}
              variant={status === 'loading' ? 'ghost' : 'solid'}
            >
              SignIn
            </Button>
            <Button hidden={status === 'loading'}>Register</Button>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default HomeNavBar;

