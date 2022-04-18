import { Box, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { CgCopy, CgMail, CgCheckO } from 'react-icons/cg';
import { RiArrowRightDownLine, RiArrowRightUpLine } from 'react-icons/ri';

interface ICard {
  graph?: boolean;
}

const Card = ({ graph }: ICard) => {
  return (
    <Box w={'full'} h='full' backgroundColor='brand.300' borderRadius={'6px'}>
      {graph ? (
        <Box>
          <Text>Graph1: {graph}</Text>
        </Box>
      ) : (
        <Box p={4}>
          <HStack
            w={'full'}
            h='full'
            justifyContent={'space-between'}
            alignItems={'flex-start'}
          >
            <VStack spacing={0.5}>
              <Box
                backgroundColor={'purple.400'}
                borderRadius={'9999'}
                p={'6px'}
                alignItems={'center'}
                justifyContent={'center'}
                display='flex'
              >
                <Icon color={'gray.200'} as={CgCopy} w={8} h={8} />
              </Box>
              <Text color={'gray.200'} fontSize={'xl'} fontWeight={'semibold'}>
                Total
              </Text>
              <Text
                color={'purple.500'}
                fontSize={'xl'}
                fontWeight={'semibold'}
                style={{
                  WebkitTextStroke: '0.3px black',
                }}
              >
                53
              </Text>
              <Text
                color={'whiteAlpha.600'}
                fontSize={'xs'}
                fontWeight={'normal'}
              >
                44 closed, <br />
                123 new
              </Text>
            </VStack>
            <VStack spacing={0.5}>
              <Box
                backgroundColor={'#5D5FEF'}
                borderRadius={'9999'}
                p={'6px'}
                alignItems={'center'}
                justifyContent={'center'}
                display='flex'
              >
                <Icon color={'gray.200'} as={CgCheckO} w={8} h={8} />
              </Box>
              <Text color={'gray.200'} fontSize={'xl'} fontWeight={'semibold'}>
                Closed
              </Text>
              <Text
                color={'#5D5FEF'}
                fontSize={'xl'}
                fontWeight={'semibold'}
                style={{
                  WebkitTextStroke: '0.3px black',
                }}
              >
                55%
              </Text>
              <HStack spacing={0}>
                <Flex align={'center'} justify='center'>
                  <Icon
                    w={'22px'}
                    h={'22px'}
                    as={RiArrowRightUpLine}
                    color='green.500'
                  />
                </Flex>
                <Text
                  color={'whiteAlpha.600'}
                  fontSize={'xs'}
                  fontWeight={'normal'}
                  alignItems={'center'}
                >
                  110 tickets
                </Text>
              </HStack>
            </VStack>
            <VStack spacing={0.5}>
              <Box
                backgroundColor={'blue.600'}
                borderRadius={'9999'}
                p={'6px'}
                alignItems={'center'}
                justifyContent={'center'}
                display='flex'
              >
                <Icon color={'gray.200'} as={CgMail} w={8} h={8} />
              </Box>
              <Text color={'gray.200'} fontSize={'xl'} fontWeight={'semibold'}>
                Total
              </Text>
              <Text
                color={'blue.600'}
                fontSize={'xl'}
                fontWeight={'semibold'}
                style={{
                  WebkitTextStroke: '0.3px black',
                }}
              >
                53
              </Text>
              <HStack spacing={0}>
                <Flex align={'center'} justify='center'>
                  <Icon
                    w={'22px'}
                    h={'22px'}
                    as={RiArrowRightDownLine}
                    color='red.700'
                  />
                </Flex>
                <Text
                  color={'whiteAlpha.600'}
                  fontSize={'xs'}
                  fontWeight={'normal'}
                >
                  110 tickets
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

Card.defaultProps = {
  graph: false,
};

export default Card;

