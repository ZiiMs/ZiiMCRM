import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { RiArrowDownSFill } from 'react-icons/ri';
import Dropzone from '../dropzone';
import Comment from '../comment';

const Drawer = () => {
  const [favorite, setFavorite] = useState(false);
  const [comments, setComments] = useState<any[]>();
  const [status, setStatus] = useState<string>('New Ticket');

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/comments');
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      if (data.length > 0) {
        setComments(data);
      }
    };

    getComments().catch(console.error);
  }, []);

  return (
    <Flex h={'100vh'} maxH={'100vh'} backgroundColor={'brand.700'}>
      <VStack w='full' h={'100%'}>
        <VStack w='full' h={'100%'}>
          <VStack
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            p={2}
            w='full'
          >
            <HStack spacing={1} w='full'>
              <Button
                variant={'unstyled'}
                size={'2xs'}
                m={0}
                p={0}
                w={'16px'}
                h={'16px'}
                as={favorite ? AiFillStar : AiOutlineStar}
                color={favorite ? 'yellow.500' : 'whiteAlpha.600'}
                onClick={() => setFavorite(!favorite)}
              />

              <Text color={'whiteAlpha.600'}>#0123456</Text>
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
          <Box
            maxW={'fit-content'}
            maxH={'100%'}
            px={2}
            overflowY={'scroll'}
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
              {comments
                ? comments.map((comment) => {
                    const user = {
                      email: comment.email,
                      id: 'cl20kslpk0006u0v94e0729bh',
                    };

                    return <Comment user={user} body={comment.body} />;
                  })
                : null}
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Drawer;

