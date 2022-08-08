import { Spinner, Text, VStack } from '@chakra-ui/react';

const Loading: React.FC = () => {
  return (
    <VStack
      w='full'
      minH={'100vh'}
      minW={'100vw'}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Spinner
        size={'xl'}
        thickness={'4px'}
        speed={'0.65s'}
        color={'gray.200'}
        backgroundColor={'transparent'}
      />
      <Text fontSize={'xl'}>Loading ...</Text>
    </VStack>
  );
};

export default Loading;

