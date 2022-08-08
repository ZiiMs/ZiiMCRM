import { Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface ICard {
  title: string;
  description: string;
  icon?: IconType;
}

const DropDownCard: React.FC<ICard> = ({ title, description, icon }) => {
  return (
    <VStack
      alignItems={'flex-start'}
      as={'button'}
      p={{ base: 2, md: 4 }}
      spacing={0}
      borderRadius={8}
      textColor={'whiteAlpha.700'}
      _hover={{
        cursor: 'pointer',
        textColor: 'brand.100',
        bgColor: 'brand.500',
      }}
    >
      <HStack spacing={1} alignItems={'center'} justifyContent={'center'}>
        {icon && <Icon as={icon} />}
        <Text
          fontSize={{ base: 'sm', md: 'lg' }}
          fontWeight={'normal'}
          textColor={'inherit'}
        >
          {title}
        </Text>
      </HStack>

      <Text
        fontSize={{ base: '0.75rem', md: 'sm' }}
        textColor={'inherit'}
        overflow={'hidden'}
      >
        {description}
      </Text>
    </VStack>
  );
};

export default DropDownCard;

