import { trpc } from '@/utils/trpc';
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
import registerToggle from 'src/stores/registerContext';

const RegisterModal = () => {
  const [error, setError] = useState<String | null>(null);
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<number>();
  const [isAgeValid, setAgeValid] = useState(true);
  const [isGenderValid, setGenderValid] = useState(true);
  const { mutate } = trpc.useMutation(['users.create'], {
    onSuccess: (data) => {
      setError(null);
      toggleRegister();
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
    },
  });
  const { showRegister, toggleRegister } = useContext(registerToggle);
  const { data: session } = useSession();

  useEffect(() => {

    return () => {};
  }, [session, showRegister]);

  const name = session?.user?.name ?? '';
  const email = session?.user?.email ?? '';

  const handleClose = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let valid = true;
    gender == ''
      ? (setGenderValid(false), (valid = false))
      : setGenderValid(true);
    age === null || age === undefined || (age >= 16 && age <= 100)
      ? setAgeValid(true)
      : (setAgeValid(false), (valid = false));

    if (!session || !isGenderValid || !isAgeValid || !valid) {
      setError('You must be logged in to do that!');
      return;
    }

    mutate({
      age: age ?? 18,
      gender: gender,
    });
  };

  // const isGenderValid = gender !== '';
  // const isAgeValid = age != null || (age != undefined && age > 16 && age < 100);
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
              <FormControl>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input backgroundColor={'brand.900'} isDisabled value={name} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input backgroundColor={'brand.900'} isDisabled value={email} />
              </FormControl>
            </HStack>
            <HStack
              width={'full'}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
            >
              <FormControl isInvalid={!isGenderValid}>
                <FormLabel htmlFor='gender'>
                  Gender({isGenderValid.toString()})
                </FormLabel>
                <Select
                  value={gender}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    e.target.value == ''
                      ? setGenderValid(false)
                      : setGenderValid(true);

                    setGender(e.target.value);
                  }}
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
              <FormControl isInvalid={!isAgeValid}>
                <FormLabel>Age</FormLabel>
                <NumberInput
                  title='Age'
                  backgroundColor={'brand.900'}
                  borderRadius={'6px'}
                  defaultValue={0}
                  min={1}
                  max={100}
                  value={age}
                  onChange={(_: string, vn: number) => {
                    vn != null && vn >= 16 && vn <= 100
                      ? setAgeValid(true)
                      : setAgeValid(false);
                    setAge(vn);
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>Age is invalid (16-100).</FormErrorMessage>
              </FormControl>
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

