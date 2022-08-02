import { trpc } from '@/utils/trpc';
import {
  Button,
  Input, InputGroup, InputRightAddon, Modal,
  ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  boardId: string;
  onClose: () => void;
};

const ShareCodeModal: React.FC<Props> = ({ open, onClose, boardId }) => {
  const [copied, setCopied] = useState(false);
  const { data, mutate, isLoading } = trpc.useMutation(['boards.genKey'], {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const handleClose = () => {
    setCopied(false)
    onClose();
  }

  useEffect(() => {
    if (open) {
      mutate({
        boardId: boardId,
      });
    }
  }, [boardId, mutate, open]);

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Generate Key</ModalHeader>
        <ModalBody>
          {!isLoading && data !== undefined ? (
            <InputGroup>
              <Input onInput={() => {}} value={data.storedKey.code} />
              <InputRightAddon
                as={Button}
                onClick={() => {
                  navigator.clipboard.writeText(data.storedKey.code);
                  setCopied(true);
                  console.log('Copied');
                }}
              >
                {/* <Button
                  onClick={() => {
                    console.log('Copied');
                  }}
                >
                  Copy
                </Button> */}
                {copied ? 'Copied!' : 'Copy'}
              </InputRightAddon>
            </InputGroup>
          ) : (
            <Button
              w={'full'}
              variant={'outline'}
              isLoading
              loadingText='Generating Key'
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShareCodeModal;

