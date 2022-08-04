import Layout from '@/components/layout';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';

const Recent: NextPage = () => {
  return (
    <Layout>
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
          <Heading color={'gray.200'}>Recent</Heading>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default Recent;

