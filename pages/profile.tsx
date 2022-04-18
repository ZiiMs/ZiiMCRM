import { Button, Text, Image, Heading, HStack, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';

const Profile: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <HStack
        w={'full'}
        h={'full'}
        alignItems={'flex-start'}
        justifyContent={'flex-start'}
      >
        <VStack
          w={'full'}
          h={'full'}
          spacing={8}
          alignItems='flex-start'
          pt={6}
          px={4}
          pb={3}
        >
          <Heading color={'gray.200'}>Profile</Heading>
          {session.user ? (
            <Image alt='profile picture' src={session.user.image} />
          ) : null}

          <Button onClick={() => signOut()}>Sign Out</Button>
        </VStack>
      </HStack>
    );
  }
  return (
    <div>
      <HStack
        w={'full'}
        h={'full'}
        alignItems={'flex-start'}
        justifyContent={'flex-start'}
      >
        <VStack
          w={'full'}
          h={'full'}
          spacing={8}
          alignItems='flex-start'
          pt={6}
          px={4}
          pb={3}
        >
          <Heading color={'gray.200'}>Profile</Heading>
          <Button onClick={() => signIn()}>Sign In</Button>
        </VStack>
      </HStack>
    </div>
  );
};

export default Profile;

