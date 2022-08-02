import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';

// import Board from '@/components/board';
// import Card from '@/components/card';
// import Drawer from '@/components/drawer';
import BrandIconButton from '@/components/iconButton';
import Loading from '@/components/loading';
import CreateGroupModal from '@/components/Modals/Group';
import ShareCodeModal from '@/components/Modals/Share';
import CreateTicketModal from '@/components/Modals/Ticket';
import { trpc } from '@/utils/trpc';
import { Ticket } from '@prisma/client';
import type { NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiSettings3Line } from 'react-icons/ri';

const Drawer = dynamic(() => import('@/components/drawer'));
const Group = dynamic(() => import('@/components/group'));
const Card = dynamic(() => import('@/components/card'));

const Dashboard: NextPage = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const { data: session } = useSession();
  const [createGroupOpen, setCreateGroup] = useState(false);
  const [shareCodeOpen, setShareCode] = useState(false);
  const [createTicket, setCreateTicket] = useState(false);

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
    return null;
  }

  const { data: groups } = trpc.useQuery([
    'group.get',
    {
      boardId: String(id),
    },
  ]);

  const { data: tickets } = trpc.useQuery([
    'ticket.get',
    {
      boardId: String(id),
    },
  ]);

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
      onError: (error: any) => {
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
              setShareCode(true);
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
          {groups && groups.length > 0 && groups.length < 5 ? (
            <Button
              w={'full'}
              display={'flex'}
              fontSize={'xl'}
              textColor={'brand.300'}
              flexDir={'column'}
              variant={'ghost'}
              fontWeight={'bold'}
              h={'full'}
              onClick={() => {
                setCreateGroup(true);
              }}
            >
              <Icon fontSize={'8xl'} as={AiOutlinePlus} />
              Create Groups
            </Button>
          ) : null}
          {groups && groups.length > 0 ? (
            groups.map((group) => (
              <React.Fragment key={group.id}>
                <CreateTicketModal
                  boardId={board!.id}
                  groupId={group.id}
                  open={createTicket}
                  onClose={() => setCreateTicket(false)}
                />
                <Group group={group} CreateTicket={() => setCreateTicket(true)}>
                  {<Text>Woiwjer</Text>}
                </Group>
              </React.Fragment>
            ))
          ) : (
            <Flex
              w={'full'}
              justifyContent={'center'}
              mb={4}
              alignItems={'center'}
              h={'full'}
            >
              <Button
                w={'40%'}
                display={'flex'}
                fontSize={'xl'}
                textColor={'brand.300'}
                flexDir={'column'}
                variant={'ghost'}
                fontWeight={'bold'}
                h={'full'}
                onClick={() => {
                  setCreateGroup(true);
                }}
              >
                <Icon fontSize={'8xl'} as={AiOutlinePlus} />
                Create Groups
              </Button>
            </Flex>
          )}
          {/* <Board Title={'Title1'}></Board>
          <Board Title={'Title2'}></Board>
          <Board Title={'Title3'}></Board>
          <Board Title={'Title4'}></Board>
          <Board Title={'Title5'}></Board> */}
        </HStack>
      </VStack>
      {ticket ? <Drawer ticket={ticket} /> : null}
      <ShareCodeModal
        boardId={board!.id}
        open={shareCodeOpen}
        onClose={() => setShareCode(false)}
      />
      <CreateGroupModal
        boardId={board!.id}
        open={createGroupOpen}
        onClose={() => setCreateGroup(false)}
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

