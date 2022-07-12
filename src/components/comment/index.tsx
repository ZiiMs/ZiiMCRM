import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

interface IComment {
  user: {
    email: string;
    id: string;
  };
  body: string;
}

const Comment = ({ body, user }: IComment) => {
  return (
    <Box backgroundColor={'brand.800'} borderRadius={'8px'} p={2}>
      <HStack justifyContent={'flex-start'} alignItems={'flex-start'}>
        <Link href={`user/${user.id}`}>
          <Avatar
            size='md'
            name='Kent Dodds'
            src='https://bit.ly/kent-c-dodds'
            mr={2}
          />
        </Link>
        <VStack
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          spacing={0}
        >
          <Text fontWeight={'bold'}>{user.email}</Text>
          <Text fontWeight={'light'} fontSize={'xs'} color={'whiteAlpha.600'}>
            4/22/2022 4:04 AM
          </Text>
          <Text fontSize={'sm'} noOfLines={4} pt={2}>
            {body}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Comment;

