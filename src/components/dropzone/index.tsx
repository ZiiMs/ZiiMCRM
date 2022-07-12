import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { HiOutlinePhotograph } from 'react-icons/hi';

const Dropzone = () => {
  return (
    <Box w={'100%'}>
      <Text fontSize={'md'} color={'whiteAlpha.600'}>
        Attachments
      </Text>
      <Box
        w={'100%'}
        backgroundColor={'whiteAlpha.200'}
        p={2}
        my={2}
        borderRadius={'6px'}
        as={'button'}
        _hover={{ backgroundColor: 'whiteAlpha.300' }}
        _active={{
          bg: 'whiteAlpha.300',
          transform: 'scale(0.98)',
        }}
      >
        <HStack w={'100%'}>
          <Icon as={HiOutlinePhotograph} w={'40px'} h={'40px'} />
          <VStack
            spacing={0}
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
          >
            <Text fontWeight={'bold'}>Attachment title</Text>
            <Text fontWeight={'light'} fontSize={'xs'} color={'whiteAlpha.600'}>
              105.1 KB
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Dropzone;

