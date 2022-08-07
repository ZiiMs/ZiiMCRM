import {
  Avatar,
  Box,
  Button,
  HStack,
  Link,
  Text,
  VStack
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface IComment {
  user: { name: string | null; image: string | null; id: string };
  comment: { text: string; id: number; createdAt: Date };
}

const Comment = ({ comment, user }: IComment) => {
  return (
    <Box
      as='li'
      backgroundColor={'brand.800'}
      borderRadius={'8px'}
      my={2}
      w={'full'}
      p={2}
    >
      <HStack justifyContent={'flex-start'} alignItems={'flex-start'}>
        <NextLink passHref href={`/user/${user.id}`}>
          <Link p={0} size={'lg'} m={0}>
            <Avatar
              size='md'
              backgroundColor={user.image ? 'transparent' : undefined}
              name={user.name ?? undefined}
              src={user.image ?? undefined}
              mr={2}
            />
          </Link>
        </NextLink>
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

