import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import React, { useState } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';

const Drawer = () => {
  const [favorite, setFavorite] = useState(false);
  const [status, setStatus] = useState<string>('New Ticket');
  return (
    <Flex h={'100vh'} backgroundColor={'brand.300'}>
      <VStack spacing={2.5} w='full'>
        <VStack spacing={2} w='full'>
          <HStack
            spacing={1}
            w='full'
            p={2}
            justifyContent={'flex-start'}
            alignItems={'center'}
          >
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

            <Text color={'whiteAlpha.600'}>#0123456</Text>
          </HStack>
          <Divider borderColor={'brand.500'} p={0} m={0} w={'full'} />
          <VStack
            w={'full'}
            spacing={3}
            justify={'flex-start'}
            align={'flex-start'}
          >
            <SimpleGrid columns={2} p={'10px'} w={'100%'}>
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
                      <MenuItem key={item} onClick={(e) => setStatus(item)}>
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
            <Flex>
              <Text fontSize={'md'} color={'whiteAlpha.600'}>
                Description:
              </Text>
              <Text color={'gray.200'}>
                Reprehenderit eu commodo est non. Culpa aliquip ex veniam do.
                Labore nostrud adipisicing id sit do aliquip occaecat sint et
                magna velit eiusmod. Cupidatat cillum cupidatat eiusmod
                pariatur. Eu non dolor aliqua cupidatat excepteur pariatur.
                Lorem ut elit proident laboris labore ad.
              </Text>
            </Flex>
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Drawer;

{
  /* <TableContainer>
  <TableContainer variant={'unstyled'} size='sm'>
    <Tbody>
      <VStack spacing={3}>
        <Box p={0} m={0}>
          <Tr>
            <Td py={0} pb={1} pl={0}>
              <Text fontSize={'md'} color={'whiteAlpha.600'}>
                Created:
              </Text>
            </Td>
            <Td py={0} pb={1} pl={0}>
              <Text fontSize={'md'} color={'gray.200'}>
                Today
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Td py={0} pb={1} pl={0}>
              <Text fontSize={'md'} color={'whiteAlpha.600'}>
                Due Date:
              </Text>
            </Td>
            <Td py={0} pb={1} pl={0}>
              <Text fontSize={'md'} color={'gray.200'}>
                April 4
              </Text>
            </Td>
          </Tr>
        </Box>
        <Box p={0} m={0}>
          <Tr>
            <Td py={0} pb={1} pl={0}>
              <Text fontSize={'md'} color={'whiteAlpha.600'}>
                Status:
              </Text>
            </Td>
            <Td py={0} pb={1} pl={0}>
              <Menu>
                <MenuButton
                  size={'sm'}
                  as={Button}
                  variant={'ghost'}
                  rightIcon={
                    <Icon
                      as={RiArrowDownSFill}
                      color={'blue.600'}
                      w={'24px'}
                      h={'24px'}
                    />
                  }
                >
                  New Ticket
                </MenuButton>
              </Menu>
            </Td>
          </Tr>
          <Tr>
            <Td py={0} pb={1} pl={0}>
              <Text fontSize={'md'} color={'whiteAlpha.600'}>
                Due Date:
              </Text>
            </Td>
            <Td py={0} pb={1} pl={0}>
              <Text fontSize={'md'} color={'gray.200'}>
                April 4
              </Text>
            </Td>
          </Tr>
        </Box>
      </VStack>
    </Tbody>
  </Table>
</TableContainer>; */
}

