import { ComponentWithAs, Icon, IconProps } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface BIconOptionalProps {
  Color?: string;
}

interface BIconProps
  extends ComponentWithAs<'svg', IconProps>,
    BIconOptionalProps {
  AsIcon: IconType;
  size: any;
}

const BrandIcon = ({ Color, AsIcon, ...props }: BIconProps) => {
  return <Icon {...props} as={AsIcon} size={props.size} color={Color} />;
};

const defaultProps: BIconOptionalProps = {
  Color: 'brand.400',
};

BrandIcon.defaultProps = defaultProps;

export default BrandIcon;

