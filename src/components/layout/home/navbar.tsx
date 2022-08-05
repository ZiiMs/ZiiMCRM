import { AutoAnimate } from '@/components/autoanimate';
import Dropzone from '@/components/dropzone';
import useNavbarDrawer from '@/stores/navbarDrawerStore';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  Fade,
  Heading,
  HStack,
  Icon,
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
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineDeviceHub } from 'react-icons/md';
import shallow from 'zustand/shallow';

interface INavbarProps {
  openBoard: (e: MouseEvent<HTMLButtonElement>) => void;
}

const HomeNavBar = () => {
  // const { boards, setBoards } = useContext(boardContext);
  const { data: session, status } = useSession();

  const { toggleDrawer, type, isNavbarOpen } = useNavbarDrawer(
    (state) => ({
      toggleDrawer: state.toggleDrawer,
      type: state.type,
      isNavbarOpen: state.isNavbarOpen,
    }),
    shallow
  );
  const [MenuOpen, setMenuOpen] = useState(false);
  const user = session?.user;
  const userId = user?.id;
  const toast = useToast();

  const router = useRouter();

  return (
    <>
      <VStack zIndex={'2'} position={'relative'}>
        <HStack
          as={'nav'}
          alignItems={'center'}
          bgColor={'brand.800'}
          m={0}
          p={0}
          w='100vw'
          justifyContent='space-between'
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
                  toggleDrawer(<Dropzone />);
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
              <Menu
                placement='bottom'
                isOpen={MenuOpen}
                onClose={() => setMenuOpen(false)}
              >
                <MenuButton
                  as={Button}
                  onClick={() => setMenuOpen(!MenuOpen)}
                  p={0}
                  size={'lg'}
                  disabled={!user}
                  color={
                    router.asPath === `/user/${user?.id}`
                      ? 'brand.100'
                      : 'brand.400'
                  }
                  leftIcon={MenuOpen ? <BiChevronDown /> : <BiChevronUp />}
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
        <Collapse
          in={isNavbarOpen}
          animateOpacity
          style={{
            zIndex: '2',
            position: 'absolute',
            top: '100%',
            margin: '0',
          }}
        >
          <Container maxW={'none'} width={'100vw'} bgColor={'red.500'}>
            <VStack w='full' spacing={4}>
              <HStack>{type}</HStack>
            </VStack>
          </Container>
        </Collapse>
      </VStack>
      <Box
        onClick={() => {
          toggleDrawer();
        }}
        hidden={!isNavbarOpen}
        style={{
          zIndex: '1',
          margin: '0',
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100vw',
          height: '100vh',
        }}
        bgColor={'blackAlpha.500'}
      />
    </>
  );
};

export default HomeNavBar;

