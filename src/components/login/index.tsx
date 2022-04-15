import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord, FaFacebookSquare, FaGithub } from 'react-icons/fa';
import loginToggle from 'src/context/loginContext';

const LoginModal = () => {
  const [error, setError] = useState<String | null>(null);
  const { showLogin, toggleLogin } = useContext(loginToggle);
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Login?', session, showLogin);

    return () => {};
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session) {
      setError('You must be logged in to do that!');
      return;
    }
    setError(null);
    toggleLogin();
  };

  const handleLogin = (
    e: React.MouseEvent<HTMLButtonElement>,
    provider: string
  ) => {
    e.preventDefault();
    console.log('Signin: ', provider);
    try {
      signIn(provider);
      toggleLogin();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      size={'lg'}
      closeOnOverlayClick={false}
      isOpen={showLogin}
      onClose={toggleLogin}
    >
      <ModalOverlay bg={'blackAlpha.700'}/>
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalBody w={'fit-content'}>
          <VStack
            alignItems={'center'}
            px={2}
            m={0}
            width={'100%'}
            justifyContent={'center'}
          >
            <HStack
              width={'full'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Button
                width={'100%'}
                backgroundColor='white'
                onClick={(e) => handleLogin(e, 'google')}
                color='gray.900'
                variant='outline'
                leftIcon={<FcGoogle />}
                _hover={{ bg: 'gray.100' }}
                _active={{
                  bg: 'gray.100',
                  transform: 'scale(0.95)',
                }}
              >
                Sign in with Google
              </Button>
              <Button
                width={'100%'}
                backgroundColor='white'
                onClick={(e) => handleLogin(e, 'github')}
                color='gray.900'
                variant='outline'
                leftIcon={<FaGithub />}
                _hover={{ bg: 'gray.100' }}
                _active={{
                  bg: 'gray.100',
                  transform: 'scale(0.95)',
                }}
              >
                Sign in with Github
              </Button>
            </HStack>
            <HStack alignItems={'center'} justifyContent={'center'}>
              <Button
                width={'100%'}
                backgroundColor='#4266B3'
                onClick={(e) => handleLogin(e, 'facebook')}
                color='gray.100'
                variant='outline'
                leftIcon={<FaFacebookSquare />}
                _hover={{ bg: '#4376B3' }}
                _active={{
                  bg: 'gray.100',
                  transform: 'scale(0.95)',
                }}
              >
                Sign in with Facebook
              </Button>
              <Button
                width={'100%'}
                backgroundColor='#7288DB'
                onClick={(e) => handleLogin(e, 'discord')}
                color='gray.100'
                variant='outline'
                leftIcon={<FaDiscord />}
                _hover={{ bg: '#7398DB' }}
                _active={{
                  bg: 'gray.100',
                  transform: 'scale(0.95)',
                }}
              >
                Sign in with Discord
              </Button>
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
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;

