import { prisma } from '@/utils/database';
import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { User } from '@prisma/client';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

interface IProps {
  user: User;
}

const Profile = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
            </HStack>
          </VStack>
        ) : null}
      </VStack>
    </HStack>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const { id } = context.params ? context.params : { id: 'nan' };

  if (id === 'nan' || typeof id != 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const user = await prisma.user.findFirst({
    where: { id: id },
  });
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Profile;

