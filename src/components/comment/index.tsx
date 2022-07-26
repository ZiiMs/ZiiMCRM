import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Comments, User } from '@prisma/client';
import Link from 'next/link';

interface IComment {
  user: User;
  comment: Comments;
}

const Comment = ({ comment, user }: IComment) => {
  return (
    <Box backgroundColor={'brand.800'} borderRadius={'8px'} p={2}>
      <HStack justifyContent={'flex-start'} alignItems={'flex-start'}>
        <Link href={`/user/${user.id}`}>
          <Avatar
            size='md'
            backgroundColor={user.image ? 'transparent' : undefined}
            name={user.name ?? undefined}
            src={user.image ?? undefined}
            mr={2}
          />
        </Link>
        <VStack
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          spacing={0}
        >
          <Text fontWeight={'bold'}>{user.name}</Text>
          <Text fontWeight={'light'} fontSize={'xs'} color={'whiteAlpha.600'}>
            {comment.createdAt.toLocaleDateString() +
              ' @ ' +
              comment.createdAt.toLocaleTimeString()}
          </Text>
          <Text fontSize={'sm'} noOfLines={4} pt={2}>
            {comment.text}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Comment;

