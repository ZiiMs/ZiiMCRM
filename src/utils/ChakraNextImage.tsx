import { chakra, ImageProps as ChakraImageProps } from '@chakra-ui/react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

type Props = NextImageProps & Omit<ChakraImageProps, 'src'>;

const ChakraNextImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ['layout', 'src', 'alt', 'placeholder', 'width', 'height'].includes(prop),
});

const Image = (props: Props) => <ChakraNextImage {...props} />;

export default Image;

