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
  Link,
  Menu,
  MenuButton,
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
          <Text
            as={'button'}
            px={3}
            _hover={{
              cursor: 'pointer',
              color: 'brand.200',
            }}
            onClick={(e) => {
              e.preventDefault();
              setShowDrawer(true);
            }}
          >
            Features
          </Text>
          <Text
            as={'button'}
            px={3}
            _hover={{
              cursor: 'pointer',
              color: 'brand.200',
            }}
          >
            Solutions
          </Text>
          <Text
            as={'button'}
            px={3}
            _hover={{
              cursor: 'pointer',
              color: 'brand.200',
            }}
          >
            Resources
          </Text>
          <Text
            as={'button'}
            px={3}
            _hover={{
              cursor: 'pointer',
              color: 'brand.200',
            }}
          >
            Support
          </Text>
        </HStack>
      </HStack>
      <HStack px={2}>
        {session && user ? (
          <>
            {user.image ? (
              <Avatar
                size={'sm'}
                m={0}
                backgroundColor={'transparent'}
                p={0}
                name={user.name ?? undefined}
                src={user?.image ? user.image : undefined}
              />
            ) : (
              <Icon as={CgProfile} />
            )}
          </>
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

