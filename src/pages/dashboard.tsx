import { Heading, HStack, VStack } from '@chakra-ui/react';

import Board from '@/components/board';
import Card from '@/components/card';
import Drawer from '@/components/drawer';
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
        <Heading color={'gray.200'}>Dashboard</Heading>
        <HStack w={'full'} spacing={4}>
          <Card graph></Card>
          <Card></Card>
        </HStack>
        <HStack w={'full'} h={'full'} spacing={2.5}>
          <Board Title={'Title1'}></Board>
          <Board Title={'Title2'}></Board>
          <Board Title={'Title3'}></Board>
          <Board Title={'Title4'}></Board>
          <Board Title={'Title5'}></Board>
        </HStack>
      </VStack>
      {drawer ? <Drawer /> : null}
    </HStack>
  );
};

export default Home;

