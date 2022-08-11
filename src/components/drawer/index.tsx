import useDrawerStore from '@/stores/drawerStore';
import { trpc } from '@/utils/trpc';
import {
  Alert,
  AlertIcon,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import { Status, Ticket } from '@prisma/client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import {
  AiFillStar,
  AiOutlineDelete,
  AiOutlineDoubleRight,
  AiOutlineStar
} from 'react-icons/ai';
import { BsPlusCircleFill } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import { MdCardMembership } from 'react-icons/md';
import { RiArrowDownSFill, RiDeleteBinFill } from 'react-icons/ri';
import shallow from 'zustand/shallow';
import { AutoAnimate } from '../autoanimate';
// import Comment from '../comment';
import Dropzone from '../dropzone';
import BrandIconButton from '../iconButton';
const Comment = dynamic(() => import('../comment'));
type ICommentUser = {
  User: {
    name: string | null;
    image: string | null;
    id: string;
  };
  text: string;
  id: number;
  createdAt: Date;
};

interface IDrawer {
  ticket: Ticket;
  open: boolean;
}

const Drawer = () => {
  const { showDrawer, role, ticket, closeDrawer, setTicket } = useDrawerStore(
    (state) => ({
      showDrawer: state.showDrawer,
      ticket: state.ticket,
      role: state.userRole,
      setTicket: state.setTicket,
      closeDrawer: state.closeDrawer,
    }),
    shallow
  );

  const toast = useToast();

  const [favorite, setFavorite] = useState(false);
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<string>('New Ticket');
  const client = trpc.useContext();
  const { mutate: deleteTicket, isLoading: isDeleting } = trpc.useMutation(
    ['ticket.delete'],
    {
      onSuccess: (data) => {
        client.invalidateQueries(['ticket.get']);
        closeDrawer();

        console.log(data);
        toast({
          title: 'Success',
          description: 'Ticket updated',
          duration: 5000,
          isClosable: true,
          render: () => (
            <Alert status='success' variant='solid'>
              <AlertIcon />
              {`Deleted ticket: ${data.message}`}
            </Alert>
          ),
        });
      },
    }
  );

  const { mutate: mutateTicket, isLoading } = trpc.useMutation(
    ['ticket.update'],
    {
      onSuccess: (data) => {
        client.invalidateQueries(['ticket.get']);
        setTicket(data.ticket);

        console.log(data);
        toast({
          title: 'Success',
          description: 'Ticket updated',
          duration: 5000,
          isClosable: true,
          render: () => (
            <Alert status='success' variant='solid'>
              <AlertIcon />
              {'updated'}
            </Alert>
          ),
        });
      },
    }
  );
  const { mutate } = trpc.useMutation(['comments.create'], {
    onSuccess: (newData) => {
      // client.invalidateQueries(['comments.get']);
      refetch({ refetchPage: (page, i) => i === 0 });
      // if (comments === null || comments.length === 0) {
      //   setComments([newData.Comment]);
      // } else {
      //   setComments([ newData.Comment, ...comments]);
      // }
      toast({
        position: 'top-right',
        duration: 2000,
        variant: 'solid',
        render: () => (
          <Alert status='success' variant='solid'>
            <AlertIcon />
            {'Comment posted'}
          </Alert>
        ),
      });
      setMessage('');
    },
    onError: (error) => {
      toast({
        position: 'top-right',
        duration: 2000,
        variant: 'solid',
        render: () => (
          <Alert status='error' variant='solid'>
            <AlertIcon />
            {error.message}
          </Alert>
        ),
      });
      console.log({ error });
    },
  });

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = trpc.useInfiniteQuery(
    ['comments.get', { limit: 10, ticketId: ticket?.id ?? -1 }],
    {
      getNextPageParam: (params) => params.nextCursor,
      onError: (error) => {
        console.log({ error });
        throw new Error(error.message);
      },
      // select: data => ({
      //   pages: [...data.pages].reverse(),
      //   pageParams: [...data.pageParams].reverse(),
      // })
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
    if (!message.length) {
      toast({
        position: 'top-right',
        duration: 2000,
        render: () => (
          <Alert status='error' variant='solid'>
            <AlertIcon />
            {'Message is required'}
          </Alert>
        ),
      });
      return;
    }
    mutate({
      ticketId: ticket!.id,
      text: message,
    });
  };

  const enumValues: `${Status}`[] = Object.values(Status);

  // useEffect(() => {
  //   const getComments = async () => {
  //     const res = await fetch('https://jsonplaceholder.typicode.com/comments');
  //     if (!res.ok) {
  //       throw new Error(res.statusText);
  //     }
  //     const data = await res.json();
  //     if (data.length > 0) {
  //       setComments(data);
  //     }
  //   };

  //   getComments().catch(console.error);
  // }, []);

  return (
    <>
      {showDrawer && ticket ? (
        <Flex
          h={'100vh'}
          maxH={'100vh'}
          m={0}
          flexShrink={0}
          flexGrow={1}
          w={'full'}
          backgroundColor={'brand.700'}
          position={{
            base: 'absolute',
            lg: 'relative',
          }}
          float={{ lg: 'right' }}
          style={{
            margin: '0px',
          }}
          maxW={{
            base: '100vw',
            lg: '17%',
          }}
        >
          <IconButton
            position={'absolute'}
            variant={'ghost'}
            size={'xs'}
            left={-4}
            top={'6'}
            rounded={'full'}
            onClick={() => closeDrawer()}
            color={'whiteAlpha.600'}
            bgColor={'brand.600'}
            icon={<AiOutlineDoubleRight />}
            aria-label={'closeDrawer'}
          />
          <VStack w='full' h={'100%'}>
            <VStack w='full' h={'100%'} position={'relative'}>
              <VStack
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                p={2}
                w='full'
              >
                <HStack spacing={1} w='full' justifyContent={'space-between'}>
                  <HStack>
                    <IconButton
                      variant={'unstyled'}
                      size={'md'}
                      style={{
                        margin: '0',
                        padding: '0',
                        minWidth: 'unset',
                      }}
                      m={0}
                      p={0}
                      w={'16px'}
                      h={'16px'}
                      icon={favorite ? <AiFillStar /> : <AiOutlineStar />}
                      color={favorite ? 'yellow.500' : 'whiteAlpha.600'}
                      onClick={() => setFavorite(!favorite)}
                      aria-label={'icon-button-favorite'}
                    />
                    <Text color={'whiteAlpha.600'}>#{ticket.id}</Text>
                  </HStack>
                  {role.toLowerCase() === 'admin' ? (
                    <IconButton
                      size={'sm'}
                      variant={'ghost'}
                      color={'zred.300'}
                      disabled={isDeleting}
                      fontSize={'lg'}
                      icon={<RiDeleteBinFill />}
                      aria-label={'deleteTicketButton'}
                      onClick={() => {
                        deleteTicket({
                          id: ticket.id,
                          userRole: role,
                        });
                      }}
                    />
                  ) : null}
                </HStack>
                <Heading size={'md'} textColor={'gray.200'}>
                  {ticket?.title}
                </Heading>
              </VStack>
              <Divider borderColor={'brand.900'} p={0} m={0} w={'full'} />
              <VStack
                w={'full'}
                px={'10px'}
                pt={'10px'}
                spacing={3}
                justify={'flex-start'}
                align={'flex-start'}
              >
                <SimpleGrid columns={2} w={'100%'}>
                  <Text fontSize={'md'} color={'whiteAlpha.600'}>
                    Created:
                  </Text>
                  <Text fontSize={'md'} color={'gray.200'}>
                    {ticket?.createdAt.toLocaleDateString()}
                  </Text>
                  <Text fontSize={'md'} color={'whiteAlpha.600'}>
                    Due Date:
                  </Text>
                  <Text fontSize={'md'} color={'gray.200'}>
                    April 4
                  </Text>
                  <Flex my={2}></Flex>
                  <Flex></Flex>
                  <Text fontSize={'md'} color={'whiteAlpha.600'}>
                    Status:
                  </Text>
                  <Menu>
                    <MenuButton
                      p={0}
                      fontSize={'md'}
                      justifyContent={'center'}
                      fontWeight={'normal'}
                      alignItems={'center'}
                    >
                      <Flex>
                        {status.charAt(0).toLocaleUpperCase() +
                          status.slice(1).toLocaleLowerCase()}
                        <Icon
                          as={RiArrowDownSFill}
                          display={'inline'}
                          color={'blue.600'}
                          w={'24px'}
                          h={'24px'}
                        />
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      {enumValues.map((item) => (
                        <MenuItem
                          key={item}
                          onClick={() => {
                            setStatus(item);

                            mutateTicket({
                              id: ticket.id,
                              status: item,
                            });
                          }}
                        >
                          <Text fontSize={'md'} color={'gray.200'}>
                            {item.charAt(0).toLocaleUpperCase() +
                              item.slice(1).toLocaleLowerCase()}
                          </Text>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                  <Text fontSize={'md'} color={'whiteAlpha.600'}>
                    Progress:
                  </Text>
                  <Text fontSize={'md'} color={'gray.200'}>
                    0%
                  </Text>
                  <Flex my={2}></Flex>
                  <Flex></Flex>
                  <Text fontSize={'md'} color={'whiteAlpha.600'}>
                    Members:
                  </Text>
                  <List>
                    {ticket.Members.map((member, i) => (
                      <>
                        {i >= 2 ? (
                          <Box
                            bgColor={'brand.400'}
                            boxSize={8}
                            fontSize={'md'}
                            textColor={'brand.900'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            borderRadius={'full'}
                            p={3}
                          >
                            <Text fontSize={'sm'} textColor={'inherit'}>
                              {'+' + String(ticket.Members.length - 2)}
                            </Text>
                          </Box>
                        ) : (
                          <ListItem key={member.id}>
                            <Flex alignItems={'center'}>
                              <Avatar
                                size='sm'
                                name={member.name ? member.name : 'Unknown'}
                                bgColor={
                                  member.image ? 'transparent' : undefined
                                }
                                src={member.image ?? undefined}
                                mr={2}
                              />
                              <Text color={'gray.200'}>
                                {member.name ? member.name : 'Unknown'}
                              </Text>
                            </Flex>
                          </ListItem>
                        )}
                      </>
                    ))}
                    <ListItem>
                      <Button
                        variant={'ghost'}
                        disabled={isLoading}
                        onClick={() => {
                          mutateTicket({
                            id: ticket.id,
                            member: 'cl6p41g0g4501p8taxehpnwmj',
                          });
                        }}
                        style={{ width: '100%' }}
                      >
                        <Flex alignItems={'center'}>
                          <Icon
                            as={BsPlusCircleFill}
                            color={'blue.600'}
                            boxSize={4}
                            mr={2}
                          />
                          <Text color={'gray.200'}>Manage Member</Text>
                        </Flex>
                      </Button>
                    </ListItem>
                  </List>
                </SimpleGrid>
                <Box w={'100%'}>
                  {ticket.description ? (
                    <>
                      <Text fontSize={'md'} color={'whiteAlpha.600'}>
                        Description:
                      </Text>
                      <Text
                        color={'gray.200'}
                        noOfLines={4}
                        maxWidth={'fit-content'}
                      >
                        {ticket?.description}
                      </Text>
                    </>
                  ) : null}
                </Box>
                <Dropzone />
              </VStack>
              <Divider borderColor={'brand.900'} p={0} m={0} w={'full'} />
              <VStack
                w={'full'}
                flex={1}
                flexGrow={1}
                flexBasis={0}
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
                onScroll={(e: React.UIEvent<HTMLDivElement>) => {
                  const bottom =
                    e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
                    e.currentTarget.scrollHeight - 1000;

                  if (bottom && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                  }
                }}
              >
                {(comments?.pages[0] !== undefined &&
                  comments.pages[0].comments.length) > 0 ? (
                  <Box w={'full'} h={'full'} px={2}>
                    <VStack>
                      {comments!.pages.map((group, i) => (
                        <AutoAnimate
                          as='ul'
                          key={i}
                          style={{
                            listStyle: 'none',
                            width: '100%',
                          }}
                        >
                          {group.comments.map((comment) => (
                            <Comment
                              key={String(comment.id)}
                              user={comment.User}
                              comment={comment}
                            />
                          ))}
                        </AutoAnimate>
                      ))}
                      <Text>
                        {isFetchingNextPage
                          ? 'Loading more...'
                          : hasNextPage
                          ? 'Load More'
                          : null}
                      </Text>
                    </VStack>
                  </Box>
                ) : (
                  <>
                    <Flex
                      justifyContent={'center'}
                      alignItems={'center'}
                      w={'full'}
                      h={'full'}
                    >
                      <Text>No comments</Text>
                    </Flex>
                  </>
                )}
              </VStack>
            </VStack>
            <form onSubmit={handleSubmit}>
              <InputGroup
                position={'absolute'}
                right={0}
                bottom={0}
                w={'full'}
                px={4}
                pb={2}
                backgroundColor={'transparent'}
              >
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMessage(e.target.value)
                  }
                  value={message}
                  size={'md'}
                  backdropFilter={'blur(1px)'}
                  backgroundColor={'blackAlpha.400'}
                  borderWidth={'2px'}
                />
                <InputRightElement pr={8}>
                  <BrandIconButton
                    Color={'brand.400'}
                    size={'sm'}
                    variant={'ghost'}
                    type={'submit'}
                    aria-label={'submit-comment-button'}
                    icon={<IoSend />}
                  />
                </InputRightElement>
              </InputGroup>
            </form>
          </VStack>
        </Flex>
      ) : null}
    </>
  );
};

export default Drawer;

