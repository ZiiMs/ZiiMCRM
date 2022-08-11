import useDrawerStore from '@/stores/drawerStore';
import { getStatusColor } from '@/utils/statusHelper';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  HStack,
  Tag,
  Text,
  VStack
} from '@chakra-ui/react';
import { Role, Ticket, User } from '@prisma/client';
import React from 'react';

const TicketCard: React.FC<{
  ticket: Ticket & {
    Members: User[];
  };
  role: Role;
}> = ({ ticket, role }) => {
  const openDrawer = useDrawerStore((state) => state.openDrawer);

  return (
    <Box
      h={'fit-content'}
      as={Button}
      boxShadow={'lg'}
      py={4}
      px={2}
      onClick={() => openDrawer(ticket, role)}
      bgColor={'brand.800'}
      borderRadius={9}
      w={'full'}
    >
      <VStack
        alignItems={'flex-end'}
        justifyContent={'space-between'}
        w={'full'}
      >
        <VStack h={'fit-content'} w={'full'} alignItems={'flex-start'}>
          <Text fontSize={'lg'} fontWeight={'semibold'}>
            {ticket.title}
          </Text>
          <Text
            fontSize={'xs'}
            fontWeight={'light'}
            textColor={'whiteAlpha.600'}
          >
            {ticket.description}
          </Text>
        </VStack>
        <HStack w={'full'} h={'full'} justifyContent={'space-between'}>
          <Tag textColor={'brand.100'} bgColor={getStatusColor(ticket.status)}>
            {ticket.status.charAt(0).toLocaleUpperCase() +
              ticket.status.slice(1).toLocaleLowerCase()}
          </Tag>
          <AvatarGroup  size='sm' max={4}>
            {ticket.Members.map((member) => (
              <Avatar
                key={member.id}
                name={member.name ?? ''}
                border={'none'}
                src={member.image ?? undefined}
                bgColor={member.image ? 'brand.800' : undefined}
                size={'sm'}
              />
            ))}
          </AvatarGroup>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TicketCard;

