import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import React, { useState } from 'react';

const Drawer = () => {
  const [favorite, setFavorite] = useState(false);
  return (
    <Flex h={'100vh'} backgroundColor={'brand.300'}>
      <VStack spacing={2.5}>
        <VStack spacing={2} w='full'>
          <HStack
            spacing={1}
            p={2}
            justifyContent={'flex-start'}
            alignItems={'center'}
          >
            <Button
              alignItems={'center'}
              justifyContent={'center'}
              variant={'unstyled'}
              size={'xs'}
              m={0}
              p={0}
              w={'16px'}
              h={'16px'}
              as={favorite ? AiFillStar : AiOutlineStar}
              color={favorite ? 'yellow.500' : 'whiteAlpha.600'}
              onClick={() => setFavorite(!favorite)}
            />

            <Text color={'whiteAlpha.600'}>#0123456</Text>
          </HStack>
          <Divider borderColor={'brand.500'} p={0} m={0} />
          <Text>Werwer</Text>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Drawer;

