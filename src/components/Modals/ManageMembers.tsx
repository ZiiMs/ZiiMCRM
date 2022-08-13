import useDrawerStore from '@/stores/drawerStore';
import { trpc } from '@/utils/trpc';
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast
} from '@chakra-ui/react';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { MouseEvent, useState } from 'react';
import shallow from 'zustand/shallow';

export const ManageMembers: React.FC<{ BoardId: string }> = ({ BoardId }) => {
  const toast = useToast();
  const { data: session } = useSession();
  const { ticket, showManageMembers, setTicket, toggleManageMembers } =
    useDrawerStore(
      (state) => ({
        // showDrawer: state.showDrawer,
        ticket: state.ticket,
        showManageMembers: state.showManageMembers,
        // role: state.userRole,
        setTicket: state.setTicket,
        // closeDrawer: state.closeDrawer,
        toggleManageMembers: state.toggleManageMembers,
      }),
      shallow
    );
  const [search, setSearch] = useState('');
  const client = trpc.useContext();

  const { mutate: mutateTicket, isLoading } = trpc.useMutation(
    ['ticket.update'],
    {
      onSuccess: (data) => {
        client.invalidateQueries(['boards.get-users']);
        client.invalidateQueries(['ticket.get']);

        console.log(data);
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

  const { mutate: removeUser, isLoading: isRemoving } = trpc.useMutation(
    ['ticket.user.remove'],
    {
      onSuccess: (data) => {
        client.invalidateQueries(['boards.get-users']);
        client.invalidateQueries(['ticket.get']);

        console.log(data);
        setTicket(data);

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

  const { data: Users } = trpc.useQuery([
    'boards.get-users',
    {
      id: BoardId,
    },
  ]);

  if (!ticket) {
    console.log('No ticket');
    return null;
  }

  const handleClose = () => {
    mutateTicket({
      id: ticket.id,
      member: 'cl6p41g0g4501p8taxehpnwmj',
    });
    toggleManageMembers();
  };

  return (
    <Modal isOpen={showManageMembers} onClose={toggleManageMembers}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text fontSize={'lg'}>Search</Text>
            <Input
              onInput={(e: React.FormEvent<HTMLInputElement>) =>
                setSearch(e.currentTarget.value)
              }
              value={search}
            />
          </HStack>
        </ModalHeader>

        <ModalBody>
          <Box bg={'brand.900'} p={2} borderRadius={8}>
            {Users?.map((user: User) => (
              <>
                <Box
                  key={user.id}
                  bg={'transparent'}
                  border={'1px'}
                  borderColor={'brand.700'}
                  p={2}
                  mb={2}
                  borderRadius={8}
                >
                  <HStack justifyContent={'space-between'}>
                    <HStack>
                      <Avatar
                        src={user.image ?? undefined}
                        name={user.name ?? 'Unknown'}
                        bg={user.image ? 'transparent' : undefined}
                      />
                      <Text>{user.name}</Text>
                    </HStack>
                    <Button
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        console.log('Add member', user.id);
                        if (
                          ticket.Members.some((member) => member.id === user.id)
                        ) {
                          removeUser({
                            id: ticket.id,
                            userId: user.id,
                          });
                        } else {
                          mutateTicket({
                            id: ticket.id,
                            member: user.id,
                          });
                          console.log(
                            'added',
                            ticket.Members.some(
                              (member) => member.id === user.id
                            )
                          );
                        }
                      }}
                      isDisabled={isLoading || isRemoving}
                    >
                      {ticket.Members.some((member) => member.id === user.id)
                        ? ('Remove')
                        : 'Add'}
                    </Button>
                  </HStack>
                </Box>
              </>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleManageMembers}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ManageMembers;

