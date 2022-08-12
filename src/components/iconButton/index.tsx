import { IconButton, IconButtonProps } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

interface BIconButtonProps extends IconButtonProps, BIconButtonOptionalProps {}
interface BIconButtonOptionalProps {
  Color?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const BrandIconButton = forwardRef(
  ({ Color, ref, ...props }: BIconButtonProps) => (
    <IconButton ref={ref} {...props} color={Color} />
  )
);
BrandIconButton.displayName = 'BrandIconButton';

const defaultProps: BIconButtonOptionalProps = {
  Color: 'brand.400',
};

BrandIconButton.defaultProps = defaultProps;

export default BrandIconButton;

