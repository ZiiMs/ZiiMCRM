import { trpc } from '@/utils/trpc';
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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
interface ICreateBoard {
  open: boolean;
  toggleOpen: () => void;
}

const CreateBoardModal = ({ open, toggleOpen }: ICreateBoard) => {
  const toast = useToast();
  const client = trpc.useContext();
  const { mutate } = trpc.useMutation(['boards.create'], {
    onSuccess: (data) => {
      client.invalidateQueries(['boards.fetch']);
      toast({
        position: 'top-right',
        duration: 2000,
        variant: 'solid',
        render: () => (
          <Alert status='success'>
            <AlertIcon />
            {'Board created successfully'}
          </Alert>
        ),
      });
      setBoardName('');
      setDescription('');
      setType('');
      setImage('');
      toggleOpen();
      router.push(`/dashboard/${data.board.id}`);
    },
    onError: (error) => {
      toast({
        position: 'top-right',
        duration: 2000,
        variant: 'solid',
        render: () => (
          <Alert status='error'>
            <AlertIcon />
            {error.message}
          </Alert>
        ),
      });
      console.log({ error });
      setError(error.message);
    },
  });

  const [error, setError] = useState<String | null>(null);
  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const { data: session } = useSession();

  const userId = session?.user?.id || '';

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
    mutate({
      boardName,
      description,
      type,
      image: imageurl,
    });
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

