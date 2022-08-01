import { trpc } from '@/utils/trpc';
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
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
  VStack,
} from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Board } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';
import { RiArrowDownSFill } from 'react-icons/ri';
import Comment from '../comment';
import Dropzone from '../dropzone';
import BrandIconButton from '../iconButton';

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
  currentBoard: Board;
}

const Drawer = ({ currentBoard }: IDrawer) => {
  const toast = useToast();
  const [parent] = useAutoAnimate<HTMLDivElement>();

  const [favorite, setFavorite] = useState(false);
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<string>('New Ticket');
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
    ['comments.get', { limit: 10, boardId: currentBoard.id }],
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

  // const [comments, setComments] = useState<ICommentUser[] | null>(() => {
  //   if (!data) return [];
  //   const cmts = data.pages.map((page) => page.comments).flat();
  //   console.log({ cmts });
  //   if (cmts.length <= 0) {
  //     return null;
  //   }
  //   return cmts;
  // });

  // useEffect(() => {
  //   if (!data) return;
  //   const cmts = data.pages.map((page) => page.comments).flat();
  //   if (cmts.length <= 0) {
  //     setComments(null);
  //     console.log('No comments');
  //     return;
  //   }

  //   console.log('effect', cmts);
  //   setComments(cmts);
  //   return () => {
  //     setComments(null);
  //   };
  // }, [data]);

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
      boardId: currentBoard.id,
      text: message,
    });
  };

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
    <Flex h={'100vh'} maxH={'100vh'} backgroundColor={'brand.700'} maxW={'17%'}>
      <VStack w='full' h={'100%'}>
        <VStack w='full' h={'100%'} position={'relative'}>
          <VStack
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            p={2}
            w='full'
          >
            <HStack spacing={1} w='full'>
              <Button
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

              <Text color={'whiteAlpha.600'}>#{12323409}</Text>
            </HStack>
            <Heading size={'md'} textColor={'gray.200'}>
              Example Ticket Title
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
                Today
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
                    {status}
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
                  {['New Ticket', 'In Progress', 'Resolved', 'Closed'].map(
                    (item) => (
                      <MenuItem key={item} onClick={() => setStatus(item)}>
                        <Text fontSize={'md'} color={'gray.200'}>
                          {item}
                        </Text>
                      </MenuItem>
                    )
                  )}
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
                <ListItem>
                  <Flex alignItems={'center'}>
                    <Avatar
                      size='sm'
                      name='Segun Adebayo'
                      src='https://bit.ly/sage-adebayo'
                      mr={2}
                    />
                    <Text color={'gray.200'}>Segun Adebayo</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems={'center'}>
                    <Avatar
                      size='sm'
                      name='Kent Dodds'
                      src='https://bit.ly/kent-c-dodds'
                      mr={2}
                    />
                    <Text color={'gray.200'}>Kent Dodds</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems={'center'}>
                    <Avatar
                      size='sm'
                      name='Kola Tioluwani'
                      src='https://bit.ly/tioluwani-kolawole'
                      mr={2}
                    />
                    <Text color={'gray.200'}>Kola Tioluwani</Text>
                  </Flex>
                </ListItem>
              </List>
            </SimpleGrid>
            <Box w={'100%'}>
              <Text fontSize={'md'} color={'whiteAlpha.600'}>
                Description:
              </Text>
              <Text color={'gray.200'} noOfLines={4} maxWidth={'fit-content'}>
                Reprehenderit eu commodo est non. Culpa aliquip ex veniam do.
                Labore nostrud adipisicing id sit do aliquip occaecat sint et
                magna velit eiusmod. Cupidatat cillum cupidatat eiusmod
                pariatur. Eu non dolor aliqua cupidatat excepteur pariatur.
                Lorem ut elit proident laboris labore ad.
              </Text>
            </Box>
            <Dropzone />
          </VStack>
          <Divider borderColor={'brand.900'} p={0} m={0} w={'full'} />
          {comments ? (
            <Box
              w={'full'}
              h={'full'}
              px={2}
              overflowY={'scroll'}
              onScroll={(e: React.UIEvent<HTMLDivElement>) => {
                const bottom =
                  e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
                  e.currentTarget.scrollHeight - 1000;

                if (bottom && hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
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
              <VStack>
                  {comments.pages.map((group, i) => (
                      <VStack ley={i} w={'full'} ref={parent}>
                      {group.comments.map((comment) => (
                        <Comment
                          key={String(comment.id)}
                          user={comment.User}
                          comment={comment}
                        />
                      ))}
                      </VStack>
                  ))}
                  <Text>
                    {isFetchingNextPage
                      ? 'Loading more...'
                      : hasNextPage
                      ? 'Load More'
                      : null}
                  </Text>
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
              <form onSubmit={handleSubmit}>
                <InputGroup
                  size={'md'}
                  px={2}
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
                  <InputRightElement width={'fit-content'} pr={3}>
                    {/* <BrandIconButton aria-label={'submit-icon'} icon={<IoSend />} /> */}
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
            </>
          )}
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Drawer;

