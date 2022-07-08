import { Heading, HStack, VStack } from '@chakra-ui/react';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const drawer = true;
  return (
    <HStack
      w={'full'}
      h={'full'}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
    >
      <VStack
        w={'full'}
        h={'full'}
        spacing={8}
        alignItems='flex-start'
        pt={6}
        px={4}
        pb={3}
      >
        <Heading color={'gray.200'}>Index</Heading>
      </VStack>
    </HStack>
  );
};

export default Home;

