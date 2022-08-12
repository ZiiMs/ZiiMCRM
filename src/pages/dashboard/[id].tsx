import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';

// import Board from '@/components/board';
// import Card from '@/components/card';
// import Drawer from '@/components/drawer';
import { AutoAnimate } from '@/components/autoanimate';
import BrandIconButton from '@/components/iconButton';
import Layout from '@/components/layout';
import {
  CreateGroupModal,
  CreateTicketModal,
  ShareCodeModal
} from '@/components/Modals';
import TicketCard from '@/components/ticket';
import { trpc } from '@/utils/trpc';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import { getSession, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiSettings3Line } from 'react-icons/ri';

const Drawer = dynamic(() => import('@/components/drawer'));
const Group = dynamic(() => import('@/components/group'));
const Card = dynamic(() => import('@/components/card'));
{
  /* <InferGetServerSidePropsType<typeof getServerSideProps>>  */
}
const Dashboard: NextPage = (props) =>
  // props:
  {
    const [clickedGroup, setClickedGroup] = useState<string>('');

    const router = useRouter();
    const { id } = router.query;
    const toast = useToast();
    const session = useSession();
    const [createGroupOpen, setCreateGroup] = useState(false);
    const [shareCodeOpen, setShareCode] = useState(false);
    const [createTicket, setCreateTicket] = useState(false);

    const {
      data: board,
      isLoading,
      refetch: boardFetch,
    } = trpc.useQuery(
      [
        'findUserBoard',
        {
          id: String(id),
        },
      ],
      {
        onError: (error: any) => {
          console.log('BoardError', { error });
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
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        retry: true,
      }
    );

    const {
      data: groups,
      isLoading: isGroupLoading,
      refetch: groupFetch,
    } = trpc.useQuery(
      [
        'group.get',
        {
          boardId: String(id),
        },
      ],
      {
        onError: (error: any) => {
          console.warn('groupError', error);
        },
        retry: true,
      }
    );

    const {
      data: tickets,
      isLoading: isTicketLoading,
      refetch: ticketFetch,
    } = trpc.useQuery(
      [
        'ticket.get',
        {
          boardId: String(id),
        },
      ],
      {
        onError: (error: any) => {
          console.warn('ticketError', error);
        },
        retry: true,
      }
    );

    const { data: userRole, isLoading: isRoleLoading } = trpc.useQuery(
      [
        'users.getRole',
        {
          boardId: String(id),
        },
      ],
      {
        onError: (error: any) => {
          console.warn('userRoleError', error);
        },
        retry: true,
      }
    );

    useEffect(() => {
      // if (!board) {
      //   console.log('no board');
      //   toast({
      //     position: 'top-right',
      //     duration: 5000,
      //     variant: 'solid',
      //     render: () => (
      //       <Alert status='error'>
      //         <AlertIcon />
      //         You must be logged in to view this page.
      //       </Alert>
      //     ),
      //   });
      //   router.push('/');
      // }
      if (
        !board ||
        !session ||
        !userRole ||
        isLoading ||
        isRoleLoading ||
        isGroupLoading ||
        isTicketLoading
      ) {
      }
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
    }, [
      board,
      isGroupLoading,
      isLoading,
      isRoleLoading,
      isTicketLoading,
      router,
      session,
      toast,
      userRole,
    ]);

    if (
      !board ||
      !session ||
      !userRole ||
      isLoading ||
      isRoleLoading ||
      isGroupLoading ||
      isTicketLoading
    ) {
      // setTimeout(() => {
      //   console.log('loading too long sending to home.');
      //   // router.push('/');
      // }, 8000);
      if (!board && !isLoading) {
        // setTimeout(() => {
        //   // boardFetch();
        // }, 100);
      }

      return (
        <VStack
          alignItems={'center'}
          justifyContent={'center'}
          w={'full'}
          h={'full'}
        >
          <Text>Board {String(!board)}</Text>
          <Text>Session {String(!session)}</Text>
          <Text>Roles {String(!userRole)}</Text>
          <Text>BoardLoading {String(isLoading)}</Text>
          <Text> RoleLoading {String(isRoleLoading)}</Text>
          <Text> GroupLoading {String(isGroupLoading)}</Text>
          <Text>TicketLoading {String(isTicketLoading)}</Text>
        </VStack>
      );
    }

    return (
      <Layout>
        <HStack
          flex={1}
          flexGrow={1}
          flexShrink={1}
          flexBasis={0}
          w={'full'}
          h={'full'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          style={{
            margin: '0px',
          }}
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
              <Heading>Role {userRole?.role}</Heading>
              <Button
                onClick={() => {
                  if (!board?.id) return;
                  setShareCode(true);
                }}
              >
                Share
              </Button>
            </HStack>
            <Stack
              direction={{
                base: 'column',
                lg: 'row',
              }}
              w={'full'}
              spacing={4}
            >
              <Card graph></Card>
              <Card></Card>
            </Stack>
            <Stack
              direction={{
                base: 'column',
                lg: 'row',
              }}
              w={'full'}
              h={'full'}
              display={'flex'}
              flex={1}
              flexGrow={1}
              flexBasis={0}
              spacing={2.5}
              overflowX={'auto'}
              overflowY={'auto'}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '12px',
                  borderRadius: '8px',
                  backgroundColor: `rgba(0, 0, 0, 0.15)`,
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '8px',
                  backgroundColor: `rgba(0, 0, 0, 0.4)`,
                },
              }}
            >
              {groups && groups.length > 0 ? (
                groups.map((group) => (
                  <React.Fragment key={group.id}>
                    <Group
                      group={group}
                      role={userRole.role}
                      CreateTicket={(e: any, id: any) => {
                        e.preventDefault();
                        setClickedGroup(id);
                        setCreateTicket(true);
                      }}
                    >
                      {tickets
                        ? tickets.map((ticket) => {
                            if (ticket.groupId === group.id) {
                              return (
                                <TicketCard
                                  role={userRole.role}
                                  ticket={ticket}
                                />
                              );
                            }
                            return;
                          })
                        : undefined}
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
              )}{' '}
              {groups && groups.length > 0 && groups.length < 8 ? (
                <Button
                  w={{
                    base: 'full',
                    lg: '19.5%',
                  }}
                  height={{
                    base: '30%',
                    lg: 'full',
                  }}
                  display={'flex'}
                  fontSize={'xl'}
                  textColor={'brand.300'}
                  flexDir={'column'}
                  variant={'ghost'}
                  flexShrink={0}
                  fontWeight={'bold'}
                  onClick={() => {
                    setCreateGroup(true);
                  }}
                >
                  <Icon fontSize={'8xl'} as={AiOutlinePlus} />
                  Create Groups
                </Button>
              ) : null}
              {/* <Board Title={'Title1'}></Board>
      <Board Title={'Title2'}></Board>
      <Board Title={'Title3'}></Board>
      <Board Title={'Title4'}></Board>
      <Board Title={'Title5'}></Board> */}
            </Stack>
          </VStack>

          <Drawer />
          <ShareCodeModal
            boardId={board.id}
            open={shareCodeOpen}
            onClose={() => setShareCode(false)}
          />
          <CreateGroupModal
            boardId={board.id}
            open={createGroupOpen}
            onClose={() => setCreateGroup(false)}
          />
          <CreateTicketModal
            boardId={board.id}
            groupId={clickedGroup}
            open={createTicket}
            onClose={() => setCreateTicket(false)}
          />
        </HStack>
      </Layout>
    );
  };
{
  /* <AutoAnimate
style={{
  margin: '0px',
}}
w={'full'}
h={'full'}
alignItems={'flex-start'}
justifyContent={'flex-start'}
>
</AutoAnimate> */
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

export default Dashboard;

