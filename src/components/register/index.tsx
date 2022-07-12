import registerToggle from '@/context/registerContext';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  VStack
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState
} from 'react';

const RegisterModal = () => {
  const [error, setError] = useState<String | null>(null);
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<number>();
  const { showRegister, toggleRegister } = useContext(registerToggle);
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Login?', session, showRegister);

    return () => {};
  }, [session, showRegister]);

  const name = session?.user?.name ?? '';
  const email = session?.user?.email ?? '';

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session) {
      setError('You must be logged in to do that!');
      return;
    }
    setError(null);
    toggleRegister();
  };

  const isGenderValid = gender !== '';
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={showRegister}
      onClose={toggleRegister}
    >
      <ModalOverlay bg={'blackAlpha.700'} />
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
        <ModalBody w={'fit-content'}>
          <VStack px={2} m={0} width={'100%'}>
            <HStack width={'full'}>
              <VStack align={'flex-start'} spacing={1}>
                <FormControl>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input
                    backgroundColor={'brand.900'}
                    isDisabled
                    value={name}
                  />
                </FormControl>
              </VStack>
              <VStack align={'flex-start'} spacing={1}>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    backgroundColor={'brand.900'}
                    isDisabled
                    value={email}
                  />
                </FormControl>
              </VStack>
            </HStack>
            <HStack width={'full'}>
              <VStack align={'flex-start'} spacing={1}>
                <FormControl isInvalid={!isGenderValid}>
                  <FormLabel htmlFor='gender'>
                    Gender({isGenderValid.toString()})
                  </FormLabel>
                  <Select
                    value={gender}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setGender(e.target.value)
                    }
                    bg={'#1d1d1d'}
                  >
                    <option
                      value={undefined}
                      style={{
                        backgroundColor: '#1d1d1d',
                      }}
                    ></option>
                    <option
                      value={'male'}
                      style={{
                        backgroundColor: '#1d1d1d',
                      }}
                    >
                      Male
                    </option>
                    <option
                      value={'female'}
                      style={{
                        backgroundColor: '#1d1d1d',
                      }}
                    >
                      Female
                    </option>
                    <option
                      value={'other'}
                      style={{
                        backgroundColor: '#1d1d1d',
                      }}
                    >
                      Other
                    </option>
                  </Select>
                  <FormErrorMessage>Gender is invalid.</FormErrorMessage>
                </FormControl>
              </VStack>
              <VStack align={'flex-start'} spacing={1}>
                <Text>Age</Text>
                <NumberInput
                  title='Age'
                  backgroundColor={'brand.900'}
                  borderRadius={'6px'}
                  defaultValue={1}
                  min={1}
                  max={120}
                  value={age}
                  onChange={(_: string, vn: number) => setAge(vn)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </VStack>
            </HStack>
            <HStack alignItems={'center'} justifyContent={'center'}></HStack>
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
          <HStack>
            <Button onClick={handleClose}>Save</Button>
            <Button onClick={handleClose}>Close</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;

