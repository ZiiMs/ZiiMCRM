import { trpc } from '@/utils/trpc';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack
} from '@chakra-ui/react';
import { Group } from '@prisma/client';
import React, { ReactNode } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { RiMoreFill } from 'react-icons/ri';

interface IBoard {
  group: Group;
  children?: ReactNode;
  CreateTicket: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Group = ({ group, children, CreateTicket }: IBoard) => {

  return (
    <Box
      w={'full'}
      maxW={'20%'}
      h={'full'}
      py={2.5}
      px={1}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%236E6E6EFF' stroke-width='1' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <VStack w={'full'} height={'full'}>
        <HStack
          px={1.25}
          w={'full'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
        >
          <Text fontSize={'lg'} fontWeight={'semibold'}>
            {group.name}
          </Text>
          <IconButton
            color={'gray.200'}
            aria-label={'options'}
            variant={'ghost'}
            icon={<RiMoreFill />}
          />
        </HStack>
        {children}
        <Flex
          w={'full'}
          h={'full'}
          alignItems={'flex-end'}
          justifyContent={'center'}
          px={2.5}
          pt={2.5}
        >
          <HStack alignItems={'center'} spacing={2.5} justifyContent={'center'}>
            <Button
              variant={'ghost'}
              color={'blue.600'}
              leftIcon={<BsPlusCircleFill />}
              onClick={CreateTicket}
            >
              <Text fontSize={'lg'} fontWeight={'semibold'}>
                Create Ticket
              </Text>
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Group;

