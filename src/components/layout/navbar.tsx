import settingsToggle from '@/context/settingsContext';
import {
  Avatar,
  AvatarProps,
  Box,
  Button,
  forwardRef,
  IconButton,
  IconButtonProps,
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
import { useContext, useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgTimer } from 'react-icons/cg';
import { RiHome2Line, RiSettings3Line } from 'react-icons/ri';
import BrandIconButton from '../iconButton';

const Navbar = () => {
  const { showSettings, toggleSettings } = useContext(settingsToggle);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user || null;

  const customAvatar = forwardRef<AvatarProps, 'span'>((props, ref) => (
    <Avatar ref={ref} size='sm' {...props} />
  ));

  const CustomMenuButton = forwardRef<IconButtonProps, 'button'>(
    (props, ref) => (
      <IconButton
        ref={ref}
        as={customAvatar}
        onClick={() => setIsOpen(!isOpen)}
        disabled={!user}
        color={
          router.asPath === `/user/${user?.id}` ? 'brand.100' : 'brand.400'
        }
        variant={router.asPath === `/user/${user?.id}` ? 'solid' : 'ghost'}
        size={'md'}
        src={user?.image}
        {...props}
      />
    )
  );

  const router = useRouter();

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
        <NextLink href={'/'}>
          <BrandIconButton
            as={Link}
            size={'lg'}
            Color={router.pathname === '/' ? 'brand.100' : 'brand.400'}
            variant={router.pathname === '/' ? 'solid' : 'ghost'}
            aria-label={'index button'}
            icon={<BiMenuAltLeft />}
          />
        </NextLink>
        <NextLink href={'/dashboard'}>
          <BrandIconButton
            as={Link}
            size={'lg'}
            Color={router.pathname === '/dashboard' ? 'brand.100' : 'brand.400'}
            variant={router.pathname === '/dashboard' ? 'solid' : 'ghost'}
            aria-label={'dashboard button'}
            icon={<RiHome2Line />}
          />
        </NextLink>
        <NextLink href={'/recent'}>
          <BrandIconButton
            as={Link}
            Color={router.pathname === '/recent' ? 'brand.100' : 'brand.400'}
            variant={router.pathname === '/recent' ? 'solid' : 'ghost'}
            size={'lg'}
            aria-label={'recent button'}
            icon={<CgTimer />}
          />
        </NextLink>
      </VStack>
      <VStack>
        <Menu placement='right'>
          <MenuButton
            as={Button}
            // style={{
            //   padding: '0',
            //   margin: '0',
            // }}
            p={0}
            size={'lg'}
            disabled={!user}
            color={
              router.asPath === `/user/${user?.id}` ? 'brand.100' : 'brand.400'
            }
            variant={router.asPath === `/user/${user?.id}` ? 'solid' : 'ghost'}
          >
            <Avatar
              size={'sm'}
              m={0}
              p={0}
              src={user?.image ? user.image : undefined}
            />
          </MenuButton>
          {/* <Avatar size={'xs'} src={user?.image ? user.image : undefined} /> */}
          {/* {user?.image ? (
              <Image
                src={user?.image}
                alt={''}
                width={'24px'}
                height={'24px'}
                borderRadius={'full'}
              />
            ) : (
              <Icon as={CgProfile} />
            )} */}
          <Portal>
            <MenuList>
              <NextLink href={`/user/${user?.id}`}>
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

