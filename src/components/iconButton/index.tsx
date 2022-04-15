import { IconButton, IconButtonProps } from '@chakra-ui/react';
import React from 'react';

interface BIconButtonProps extends IconButtonProps, BIconButtonOptionalProps {}
interface BIconButtonOptionalProps {
  Color?: string;
}

const BrandIconButton = ({ Color, ...props }: BIconButtonProps) => {
  return <IconButton {...props} color={Color} />;
};

const defaultProps: BIconButtonOptionalProps = {
  Color: 'brand.200',
};

BrandIconButton.defaultProps = defaultProps;

export default BrandIconButton;
