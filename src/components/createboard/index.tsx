import { useBoards } from '@/utils/swrFuncs';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Board } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
interface ICreateBoard {
  open: boolean;
  toggleOpen: () => void;
}

const CreateBoardModal = ({ open, toggleOpen }: ICreateBoard) => {
  const toast = useToast();

  const [error, setError] = useState<String | null>(null);
  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const { data: session } = useSession();

  const userId = session?.user?.id || '';

  const { boards, mutate } = useBoards(userId);

  const router = useRouter();

  const CheckErrors = () => {
    if (boardName.length < 3) {
      setError('Board name is required');
      return false;
    }
    if (description.length < 3) {
      setError('Description is required');
      return false;
    }
    if (type.length < 3) {
      setError('Type is required');
      return false;
    }
    setError(null);
    return true;
  };

  const saveBoard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(boardName, description, type);
    if (!CheckErrors()) return;
    if (!session) return;
    const imageurl = image ? image : null;
    const res = await fetch('/api/board/createboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        boardName,
        description,
        type,
        image: imageurl,
        userId: session.user.id,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      try {
        const board: Board = data.board;
        console.log(data.message);
        toast({
          position: 'top-right',
          duration: 2000,
          variant: 'solid',
          render: () => (
            <Alert status='success'>
              <AlertIcon />
              {data.message}
            </Alert>
          ),
        });
        await mutate([...boards, board], {
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        });
        setBoardName('');
        setDescription('');
        setType('');
        setImage('');
        toggleOpen();
        router.push(`/dashboard/${board.id}`);
      } catch (e: any) {
        console.log(e);
        toast({
          position: 'top-right',
          duration: 5000,
          variant: 'solid',
          render: () => (
            <Alert status='error'>
              <AlertIcon />
              {e}
            </Alert>
          ),
        });
      }
    }
  };

  return (
    <Modal size={'lg'} isOpen={open} onClose={toggleOpen}>
      <ModalOverlay bg={'blackAlpha.700'} />
      <ModalContent>
        <ModalHeader>Board</ModalHeader>
        <ModalBody w={'fit-content'}>
          <VStack
            alignItems={'flex-start'}
            px={2}
            m={0}
            width={'100%'}
            justifyContent={'flex-start'}
          >
            <HStack>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  backgroundColor={'brand.900'}
                  value={boardName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setBoardName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  backgroundColor={'brand.900'}
                  value={description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Input
                  backgroundColor={'brand.900'}
                  value={type}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setType(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  backgroundColor={'brand.900'}
                  placeholder={'Leave blank for no image. URL only'}
                  value={image}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setImage(e.target.value);
                  }}
                />
              </FormControl>
            </HStack>
            {error ? (
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Error: </AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button mr={2} onClick={saveBoard}>
            Save
          </Button>
          <Button onClick={toggleOpen}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateBoardModal;

