import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      100: '#e5e5e5',
      200: '#6e6e6e',
      300: '#3a3a3a',
      400: '#2d2d2d',
      500: '#1d1d1d',
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: 'gray.200',
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'brand.400',
        }
      }
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.500',
      },
    },
  },
});

export default theme;

