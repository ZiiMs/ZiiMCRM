import { trpc } from '@/utils/trpc';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiArrowRightSLine } from 'react-icons/ri';
interface Iplusboard {
  open: boolean;
  toggleOpen: () => void;
}

const PlusBoard = ({ open, toggleOpen }: Iplusboard) => {
  const toast = useToast();
  const [parent] = useAutoAnimate<HTMLElement>();
  const client = trpc.useContext();
  const { mutate: joinBoard } = trpc.useMutation(['boards.join'], {
    onSuccess: (data) => {
      client.invalidateQueries(['boards.fetch']);
      console.log(data);
      toast({
        position: 'top-right',
        duration: 2000,
        variant: 'solid',
        render: () => (
          <Alert status='success' variant='solid'>
            <AlertIcon />
            {'Board Joined'}
          </Alert>
        ),
      });
      toggleOpen();
      setSelected('');
      setStep(1);
      // router.push(`/dashboard/${data}`);
    },
  });
  const { mutate } = trpc.useMutation(['boards.create'], {
    onSuccess: (data) => {
      client.invalidateQueries(['boards.fetch']);
      toast({
        position: 'top-right',
        duration: 2000,
        variant: 'solid',
        render: () => (
          <Alert status='success' variant='solid'>
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
      setSelected('');
      setStep(1);
      router.push(`/dashboard/${data.board.id}`);
    },
    onError: (error) => {
      toast({
        position: 'top-right',
        duration: 2000,
        variant: 'solid',
        render: () => (
          <Alert status='error' variant='solid'>
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
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState('create');

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

  const plusboard = (
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
        <Alert status='error' variant='solid'>
          <AlertIcon />
          <AlertTitle>Error: </AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </VStack>
  );

  // const joinboard = (

  return (
    <Modal
      size={'lg'}
      isOpen={open}
      closeOnOverlayClick={true}
      onClose={toggleOpen}
    >
      <ModalOverlay bg={'blackAlpha.700'} />
      <ModalContent ref={parent}>
        <ModalHeader>
          <HStack>
            <Box
              bgColor={step >= 1 ? 'zred.400' : 'brand.200'}
              boxSize={6}
              fontSize={'md'}
              textColor={'brand.900'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={'full'}
              p={3}
            >
              {step > 1 ? <Icon size={'sm'} as={GiCheckMark} /> : 1}
            </Box>
            <Text fontSize={'sm'}>Join/Create</Text>
            <Divider
              borderColor={step === 2 ? 'zred.400' : 'brand.200'}
              borderTopWidth={'1px'}
              marginInlineEnd={3}
            />
            <Box
              bgColor={step === 2 ? 'zred.400' : 'brand.200'}
              boxSize={6}
              fontSize={'md'}
              textColor={'brand.900'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={'full'}
              p={3}
            >
              2
            </Box>
            {selected !== '' ? (
              selected === 'join' ? (
                <Text fontSize={'sm'}>Join</Text>
              ) : (
                <Text fontSize={'sm'}>Create</Text>
              )
            ) : (
              <Text fontSize={'sm'}>Join/Create</Text>
            )}
          </HStack>
        </ModalHeader>

        <ModalBody w={'fit-content'}>
          {step === 1 ? (
            <VStack alignItems={'center'} justifyContent={'center'}>
              <Heading size={'lg'}>Create a board.</Heading>
              <Text>
                A board is where you are able to keep track of tasks and
                coordinate the workflow of you office/job.
              </Text>
              <Button
                variant={'outline'}
                w={'full'}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setSelected('create');
                  setStep(2);
                }}
              >
                <Flex w={'full'} justifyContent={'space-between'}>
                  <Flex alignItems={'center'}>
                    <Icon
                      as={MdSpaceDashboard}
                      mr={3}
                      fontSize={'lg'}
                      textColor={'gray.300'}
                    />
                    <Text>{'Create my own board'}</Text>
                  </Flex>
                  <Icon
                    as={RiArrowRightSLine}
                    fontSize={'lg'}
                    textColor={'gray.300'}
                    fontWeight={'bold'}
                  />
                </Flex>
              </Button>
            </VStack>
          ) : selected === 'join' ? (
            <VStack>
              <Input
                placeholder='jrT89f'
                value={code}
                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                  setCode(e.currentTarget.value)
                }
              />
              <Text>
                Pleas enter a code above. You can find the code to a board
                located in the top right of the board. Press the button and a
                code will be generated.{' '}
              </Text>
            </VStack>
          ) : (
            plusboard
          )}
        </ModalBody>

        <ModalFooter>
          {step === 2 ? (
            <Flex w={'full'} justifyContent={'space-between'}>
              <Button
                variant={'ghost'}
                textColor={'whiteAlpha.300'}
                onClick={() => {
                  setStep(1);
                  setSelected('');
                }}
              >
                Back
              </Button>
              <div>
                <Button
                  mr={2}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    if (selected === 'join') {
                      joinBoard({
                        code,
                      });
                    } else {
                      saveBoard(e);
                    }
                  }}
                >
                  {selected === 'join' ? 'Join' : 'Create'}
                </Button>
              </div>
            </Flex>
          ) : (
            <VStack
              alignItems={'center'}
              w={'full'}
              borderTop={'1px'}
              borderTopColor={'brand.600'}
              justifyContent={'center'}
              pt={3}
            >
              <Heading size={'sm'}>Already have a code?</Heading>
              <Button
                variant={'solid'}
                w={'full'}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setSelected('join');
                  setStep(2);
                }}
              >
                Join a board
              </Button>
            </VStack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlusBoard;

