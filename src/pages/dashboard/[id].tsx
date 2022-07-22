import {
  Alert,
  AlertIcon,
  Heading,
  HStack,
  useToast,
  VStack,
} from '@chakra-ui/react';

import Board from '@/components/board';
import Card from '@/components/card';
import Drawer from '@/components/drawer';
import Loading from '@/components/loading';
import { useFindBoard } from '@/utils/swrFuncs';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Dashboard: NextPage = () => {
  const drawer = true;
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const { data: session } = useSession();

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
  const userId = session?.user?.id || '';

  const { board, error, isLoading, mutate } = useFindBoard(String(id), userId);

  if (isLoading) return <Loading />;

  if (error) {
    toast({
      position: 'top-right',
      duration: 5000,
      variant: 'solid',
      render: () => (
        <Alert status='error'>
          <AlertIcon />
          {error.name === 'NotFoundError'
            ? 'Board not found with ID or player not authorized'
            : 'Error!'}
        </Alert>
      ),
    });
    console.log(JSON.stringify(error));
    mutate((v) => v, false);
    router.push('/');
  }

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
        <Heading color={'gray.200'}>{board?.name}</Heading>
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

export default Dashboard;

