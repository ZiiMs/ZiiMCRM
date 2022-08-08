import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BiCodeAlt, BiTrendingUp } from 'react-icons/bi';
import { FaLayerGroup, FaPaintBrush, FaProjectDiagram } from 'react-icons/fa';
import { GiPencilBrush } from 'react-icons/gi';
import { GoProject } from 'react-icons/go';
import { IoTicketSharp } from 'react-icons/io5';
import {
    MdDesignServices,
    MdOutlineComment,
    MdSpaceDashboard
} from 'react-icons/md';
import DropDownCard from './dropCard';

const SolutionsDropdown: React.FC = () => {
  return (
    <VStack alignItems={'center'} w={'full'} justifyContent={'flex-start'}>
      <VStack
        textColor={'brand.300'}
        maxW={{ base: 'full', lg: '50%' }}
        w={'full'}
      >
        <Box w={'full'} alignItems={'flex-start'}>
          <Text fontWeight={'bold'} fontSize={{ base: 12, lg: 14 }}>
            Explore the features you need to help you succeed.
          </Text>
        </Box>
        <HStack
          alignItems={'flex-start'}
          w={'full'}
          justifyContent={'flex-start'}
          borderTop={'1px'}
          spacing={0}
          borderTopColor={'brand.300'}
        >
          <VStack py={6} alignItems={'flex-start'}>
            <DropDownCard
              title='Developers'
              description='Ship code faster and more efficiently with the ZiiM.Dev developer platform.'
              icon={BiCodeAlt}
            />

            <DropDownCard
              title='Project Managment'
              description='Keep track of progress and tasks with a very simple to use UI.'
              icon={GoProject}
            />
          </VStack>
          <VStack py={6} alignItems={'flex-start'}>
            <DropDownCard
              title='Sales'
              description='Keep track of deals and sales with next to no effort.'
              icon={BiTrendingUp}
            />

            <DropDownCard
              title='Creative'
              description='Easy and simple to share your designs and work with your team.'
              icon={FaPaintBrush}
            />
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SolutionsDropdown;

