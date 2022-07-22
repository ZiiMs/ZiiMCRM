import {
  Alert,
  AlertIcon,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import Board from '@/components/board';
import Card from '@/components/card';
import Drawer from '@/components/drawer';
import Loading from '@/components/loading';
import { useBoards } from '@/utils/swrFuncs';
import { Board as BoardType } from '@prisma/client';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();
  if (!session) {
    toast({
      position: 'top-right',
      duration: 5000,
      variant: 'solid',
      render: () => (
        <Alert status='error'>
          <AlertIcon />
          You must be logged in to view this page.
        </Alert>
      ),
    });
    router.push('/');
  }

  const [board, setBoard] = useState<BoardType>();

  const userId = session?.user?.id || '';

  const { boards, error, isLoading, mutate } = useBoards(userId);

  const getBoard = async (id: string) => {
    boards.forEach((b) => {});
  };

  const drawer = true;
  if (error) {
    return (
      <VStack
        w='full'
        minH={{
          base: 'auto',
          md: '100vh',
        }}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Text fontSize={'xl'}>{error}</Text>
      </VStack>
    );
  }

  if (isLoading) <Loading />;

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
        <Heading color={'gray.200'}></Heading>
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

