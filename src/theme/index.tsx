import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      100: '#e5e5e5',
      200: '#9e9e9e',
      300: '#7e7e7e',
      400: '#6e6e6e',
      500: '#5a5a5a',
      600: '#4a4a4a',
      700: '#3a3a3a',
      800: '#2d2d2d',
      900: '#1d1d1d',
    },
    zred: {
      "50": "#FF9C9C",
      "100": "#EA7979",
      "200": "#D55A5A",
      "300": "#C03F3F",
      "400": "#AB2727",
      "500": "#961414",
      "600": "#5A0D0D",
      "700": "#470707",
      "800": "#350202",
      "900": "#230000"
    }
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
          bg: 'brand.800',
        }
      }
    },
    Menu: {
      baseStyle: {
        list: {
          bg: 'brand.800',
        }
      }
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.900',
      },
    },
  },
});

export default theme;

