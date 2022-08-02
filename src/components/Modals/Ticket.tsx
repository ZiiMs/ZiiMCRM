import { trpc } from '@/utils/trpc';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';

type Props = {
  open: boolean;
  groupId: string;
  boardId: string;
  onClose: () => void;
};

const CreateTicketModal: React.FC<Props> = ({
  open,
  onClose,
  groupId,
  boardId,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const client = trpc.useContext();
  const { mutate: mutateTickets } = trpc.useMutation(['ticket.create'], {
    onSuccess: () => {
      client.invalidateQueries(['ticket.get']);
      onClose();
      setTitle('');
      setDescription('');
    },
  });
  const CreateTicket = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Create Ticket');
    mutateTickets({
      description: description,
      groupId: groupId,
      title: title,
      boardId: boardId,
    });
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Group</ModalHeader>
        <ModalBody>
          <Text>Title</Text>
          <Input
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setTitle(e.currentTarget.value)
            }
            value={title}
          />
          <Text>Description</Text>
          <Input
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setDescription(e.currentTarget.value)
            }
            value={description}
          />
        </ModalBody>
        <ModalFooter>
          <Button mr={2} onClick={CreateTicket}>
            Create
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTicketModal;

