import { Link, VStack, Text, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile, CgTimer } from 'react-icons/cg';
import { RiHome2Line, RiSettings3Line } from 'react-icons/ri';
import settingsToggle from 'src/context/settingsContext';
import BrandIcon from '../icon';
import BrandIconButton from '../iconButton';

const Navbar = () => {
  const {showSettings, toggleSettings} = useContext(settingsToggle);
  const router = useRouter();

  return (
    <VStack
      as={'nav'}
      justifyContent='space-between'
      alignItems={'center'}
      bgColor={'brand.400'}
      m={0}
      p={0}
      h='100vh'
    >
      <VStack spacing={2.5} pt={2.5} px={2} m={0}>
        <BrandIcon AsIcon={BiMenuAltLeft} size={'lg'} />
        <NextLink href={'/'}>
          <BrandIconButton
            as={Link}
            size={'lg'}
            Color={router.pathname === '/' ? 'brand.100' : 'brand.200'}
            variant={router.pathname === '/' ? 'solid' : 'ghost'}
            aria-label={'dashboard button'}
            icon={<RiHome2Line />}
          />
        </NextLink>
        <NextLink href={'/recent'}>
          <BrandIconButton
            as={Link}
            Color={router.pathname === '/recent' ? 'brand.100' : 'brand.200'}
            variant={router.pathname === '/recent' ? 'solid' : 'ghost'}
            size={'lg'}
            aria-label={'recent button'}
            icon={<CgTimer />}
          />
        </NextLink>
        <NextLink href={'/profile'}>
          <BrandIconButton
            as={Link}
            Color={router.pathname === '/profile' ? 'brand.100' : 'brand.200'}
            variant={router.pathname === '/profile' ? 'solid' : 'ghost'}
            size={'lg'}
            aria-label={'profile button'}
            icon={<CgProfile />}
          />
        </NextLink>
      </VStack>
      <Box pb={2.5} px={2} m={0}>
        <BrandIconButton
          as={Link}
          onClick={() => {
            toggleSettings();
          }}
          Color={showSettings ? 'brand.100' : 'brand.200'}
          variant={showSettings ? 'solid' : 'ghost'}
          size={'lg'}
          aria-label={'settings button'}
          icon={<RiSettings3Line />}
        />
      </Box>
    </VStack>
  );
};

export default Navbar;













