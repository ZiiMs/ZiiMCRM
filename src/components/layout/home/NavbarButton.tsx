import FeaturesDropDown from '@/components/dropdowns/features';
import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
interface INavbarProps {
  openBoard: (e: React.MouseEvent<HTMLDivElement>) => void;
  text: string;
}

const NavbarButton: React.FC<INavbarProps> = ({ openBoard, text }) => {
  return (
    <HStack
      as={'button'}
      _hover={{
        cursor: 'pointer',
        textColor: 'brand.200',
      }}
      onClick={openBoard}
      spacing={0}
      px={{ base: 'none', lg: 3 }}
    >
      <Text textColor={'inherit'} mr={{ base: 0, lg: 2 }}>
        {text}
      </Text>
      <Icon as={BiChevronDown} />
    </HStack>
  );
};

export default NavbarButton;

