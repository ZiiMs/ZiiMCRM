import { AutoAnimate } from '@/components/autoanimate';
import FeaturesDropDown from '@/components/dropdowns/features';
import SolutionsDropdown from '@/components/dropdowns/solutions';
import Dropzone from '@/components/dropzone';
import useLoginStore from '@/stores/loginStore';
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
import { MouseEvent, ReactElement, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineDeviceHub } from 'react-icons/md';
import shallow from 'zustand/shallow';
import NavbarButton from './NavbarButton';

interface INavbarProps {
  openBoard: (e: MouseEvent<HTMLButtonElement>) => void;
}

const HomeNavBar = () => {
  // const { boards, setBoards } = useContext(boardContext);
  const { data: session, status } = useSession();

  const { toggleDrawer, setType, type, isNavbarOpen } = useNavbarDrawer(
    (state) => ({
      toggleDrawer: state.toggleDrawer,
      setType: state.setType,
      type: state.type,
      isNavbarOpen: state.isNavbarOpen,
    }),
    shallow
  );

  const { showLogin, toggleLogin } = useLoginStore(
    (state) => ({
      showLogin: state.showLogin,
      toggleLogin: state.toggleLogin,
    }),
    shallow
  );
  const [MenuOpen, setMenuOpen] = useState(false);
  const user = session?.user;
  const userId = user?.id;
  const toast = useToast();

  const router = useRouter();

  const handleDropDown = (comp: ReactElement<any, any>) => {
    if (isNavbarOpen) {
      setType(comp);
    } else {
      toggleDrawer(comp);
    }
  };

  return (
    <>
      <VStack zIndex={'2'} position={'relative'}>
        <HStack
          as={'nav'}
          alignItems={'center'}
          minW={{
            base: 'auto',
            lg: '100vw',
          }}
          bgColor={'brand.800'}
          m={0}
          p={0}
          w='100vw'
          justifyContent='space-between'
        >
          <HStack
            px={2}
            py={4}
            spacing={{ base: 4, lg: 12 }}
            alignItems={'center'}
            justify={'flex-start'}
            fontSize={{ base: 'sm', lg: '3xl' }}
            fontStyle={'italic'}
            textColor={'whiteAlpha.800'}
          >
            <HStack spacing={1}>
              <Icon as={MdOutlineDeviceHub} />
              <Heading fontSize={'inherit'}>ZiiM.Dev</Heading>
            </HStack>
            <HStack
              spacing={4}
              fontSize={{ base: 'sm', lg: 'xl' }}
              fontStyle={'normal'}
              fontWeight={'medium'}
              textColor={'whiteAlpha.800'}
            >
              <NavbarButton
                openBoard={(e) => {
                  e.preventDefault();
                  handleDropDown(<FeaturesDropDown />);
                }}
                text={'Features'}
              />
              <NavbarButton
                openBoard={(e) => {
                  e.preventDefault();
                  handleDropDown(<SolutionsDropdown />);
                }}
                text={'Solutions'}
              />

              {/* <HStack
                as={'button'}
                _hover={{
                  cursor: 'pointer',
                  textColor: 'brand.200',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropDown(<SolutionsDropdown />);
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
                onClick={(e) => {
                  e.preventDefault();
                  handleDropDown(<SolutionsDropdown />);
                }}
                spacing={0}
                px={3}
              >
                <Text textColor={'inherit'} mr={2}>
                  Support
                </Text>
                <Icon as={BiChevronDown} />
              </HStack> */}
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
                  <MenuList zIndex={'3'}>
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
                  onClick={() => {
                    toggleLogin();
                  }}
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
          <Container maxW={'100vw'} width={'100vw'} bgColor={'brand.600'}>
            <VStack w='full' spacing={4}>
              <Box w={'full'} p={4}>
                {type}
              </Box>
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

