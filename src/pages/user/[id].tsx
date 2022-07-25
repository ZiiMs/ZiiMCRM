import { trpc } from '@/utils/trpc';
import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { User } from '@prisma/client';

interface IProps {
  user: User;
}

const Profile = () => {
  const { data: user } = trpc.useQuery(['users.get']);

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
        {user ? (
          <VStack p={4} borderRadius={'6px'} backgroundColor={'brand.700'}>
            <HStack>
              <Avatar
                size={'md'}
                backgroundColor={user.image ? 'transparent' : undefined}
                name={user.name ? user.name : 'nan'}
                src={user.image ? user.image : 'nan'}
              />
              <Text>{user.name}</Text>
              <Text textColor={'blue.500'}>{user.age}</Text>
              <Text textColor={'green.500'}>{user.gender}</Text>
            </HStack>
          </VStack>
        ) : null}
      </VStack>
    </HStack>
  );
};

export default Profile;

