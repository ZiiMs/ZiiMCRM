import {
  Alert,
  AlertIcon,
  Button,
  Heading,
  HStack,
  useToast,
  IconButton,
  VStack,
  Flex,
} from '@chakra-ui/react';

import Board from '@/components/board';
import Card from '@/components/card';
import Drawer from '@/components/drawer';
import { RiSettings3Line } from 'react-icons/ri';
import Loading from '@/components/loading';
import { trpc } from '@/utils/trpc';
import type { NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BrandIconButton from '@/components/iconButton';
import ShareCodeModal from '@/components/shareModal';

const Dashboard: NextPage = () => {
  const drawer = true;
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

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
        <HStack w={'full'} justifyContent={'space-between'}>
          <HStack>
            <Heading color={'gray.200'}>{board?.name}</Heading>
            <BrandIconButton
              variant={'ghost'}
              icon={<RiSettings3Line />}
              aria-label='board settings'
              onClick={() => {
                console.log('Open board settings');
              }}
            >
              Settings
            </BrandIconButton>
          </HStack>
          <Button
            onClick={() => {
              if (!board?.id) return;
              setOpen(true);
            }}
          >
            Share
          </Button>
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
      <ShareCodeModal
        boardId={board!.id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </HStack>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Dashboard;

