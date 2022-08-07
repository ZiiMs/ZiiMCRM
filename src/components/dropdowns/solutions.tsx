import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaLayerGroup, FaProjectDiagram } from 'react-icons/fa';
import { IoTicketSharp } from 'react-icons/io5';
import { MdOutlineComment, MdSpaceDashboard } from 'react-icons/md';
import DropDownCard from './dropCard';

const SolutionsDropdown: React.FC = () => {
  return (
    <VStack alignItems={'center'} w={'full'} justifyContent={'center'}>
      <VStack textColor={'brand.300'} maxW={'50%'} w={'full'}>
        <Box w={'full'} alignItems={'flex-start'}>
          <Text fontWeight={'bold'} fontSize={14}>
            Explore the features you need to help you succeed.
          </Text>
        </Box>
        <HStack
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          borderTop={'1px'}
          spacing={0}
          borderTopColor={'brand.300'}
        >
          <VStack py={6}>
            <DropDownCard
              title='Developers'
              description='Ship code faster and more efficiently with the ZiiM.Dev developer platform.'
              icon={MdSpaceDashboard}
            />

            <DropDownCard
              title='Project Managment'
              description='Keep track of progress and tasks with a very simple to use UI.'
              icon={FaLayerGroup}
            />
          </VStack>
          <VStack py={6}>
            <DropDownCard
              title='Sales'
              description='Keep track of deals and sales with next to no effort.'
              icon={IoTicketSharp}
            />

            <DropDownCard
              title='Creative'
              description='Easy and simple to share your designs and work with your team.'
              icon={MdOutlineComment}
            />
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SolutionsDropdown;

