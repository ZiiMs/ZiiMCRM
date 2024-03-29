import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  VStack
} from '@chakra-ui/react';
import { Group, Role } from '@prisma/client';
import React, { ReactNode } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { RiMoreFill } from 'react-icons/ri';
import { AutoAnimate } from '../autoanimate';

interface IBoard {
  group: Group;
  children?: ReactNode;
  role: Role
  CreateTicket: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const Group = ({ group, role, children, CreateTicket }: IBoard) => {
  return (
    <Box
      w={'full'}
      maxW={{
        base: 'full',
        lg: '19.5%',
      }}
      flexShrink={0}
      maxH={'full'}
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
        {children ? (
          <AutoAnimate
            as={VStack}
            w={'full'}
            flex={1}
            flexGrow={1}
            flexBasis={0}
            overflowY={'auto'}
            overflowX={'hidden'}
            ref={parent}
            h={'full'}
            sx={{
              '&::-webkit-scrollbar': {
                width: '12px',
                borderRadius: '8px',
                backgroundColor: `rgba(0, 0, 0, 0.15)`,
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '8px',
                backgroundColor: `rgba(0, 0, 0, 0.25)`,
              },
            }}
            px={2}
          >
            {children}
          </AutoAnimate>
        ) : null}

        <HStack alignItems={'center'} spacing={2.5} justifyContent={'center'}>
          <Button
            variant={'ghost'}
            color={'blue.600'}
            leftIcon={<BsPlusCircleFill />}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              CreateTicket(e, group.id);
            }}
          >
            <Text fontSize={'lg'} fontWeight={'semibold'}>
              Create Ticket
            </Text>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Group;

