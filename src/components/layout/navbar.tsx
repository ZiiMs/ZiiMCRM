import settingsToggle from '@/context/settingsContext';
import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile, CgTimer } from 'react-icons/cg';
import { RiHome2Line, RiSettings3Line } from 'react-icons/ri';
import BrandIconButton from '../iconButton';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const { showSettings, toggleSettings } = useContext(settingsToggle);
  const { data: session } = useSession();

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
            as={IconButton}
            color={
              router.asPath === `/user/${session?.user.id}`
                ? 'brand.100'
                : 'brand.400'
            }
            variant={
              router.asPath === `/user/${session?.user.id}` ? 'solid' : 'ghost'
            }
            size={'lg'}
            aria-label={'profile button'}
            icon={<CgProfile />}
          />
          <Portal>
            <MenuList>
              <NextLink href={`/user/${session?.user.id}`}>
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

