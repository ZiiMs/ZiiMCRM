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
  boardId: string;
  onClose: () => void;
};

const CreateGroupModal: React.FC<Props> = ({ open, onClose, boardId }) => {
  const [name, setName] = useState('');
  const client = trpc.useContext();
  const { mutate } = trpc.useMutation(['group.create'], {
    onSuccess: (data) => {
      client.invalidateQueries(['group.get', { boardId }]);
    },
  });
  const handleClose = () => {
    mutate({
      boardId,
      title: name,
    });
    setName('');
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Group</ModalHeader>
        <ModalBody>
          <Text>Title</Text>
          <Input
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setName(e.currentTarget.value)
            }
            value={name}
          />
        </ModalBody>
        <ModalFooter>
          <Button mr={2} onClick={handleClose}>
            Create
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateGroupModal;

