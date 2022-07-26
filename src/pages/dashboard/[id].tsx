import {
  Alert,
  AlertIcon,
  Button,
  Heading,
  HStack,
  useToast,
  VStack,
} from '@chakra-ui/react';

import Board from '@/components/board';
import Card from '@/components/card';
import Drawer from '@/components/drawer';
import Loading from '@/components/loading';
import { trpc } from '@/utils/trpc';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Dashboard: NextPage = () => {
  const drawer = true;
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const { data: session } = useSession();

  if (!session || id === undefined) {
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
  const {
    data: board,
    isLoading,
    error,
  } = trpc.useQuery(
    [
      'findUserBoard',
      {
        id: String(id),
      },
    ],
    {
      onError: (error) => {
        console.log({ error });

        toast({
          position: 'top-right',
          duration: 5000,
          variant: 'solid',
          render: () => (
            <Alert status='error'>
              <AlertIcon />
              {error.message}
            </Alert>
          ),
        });
        router.push('/');
      },
    }
  );

  if (isLoading) return <Loading />;

  if (error) {
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
        <HStack>
          <Heading color={'gray.200'}>{board?.name}</Heading>
          <Button>Settings</Button>
        </HStack>
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
      {drawer && board ? <Drawer currentBoard={board} /> : null}
    </HStack>
  );
};

export default Dashboard;

