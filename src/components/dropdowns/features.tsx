import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { FaLayerGroup, FaProjectDiagram } from 'react-icons/fa';
import { IoTicketSharp } from 'react-icons/io5';
import { MdOutlineComment, MdSpaceDashboard } from 'react-icons/md';
import DropDownCard from './dropCard';

const FeaturesDropDown: React.FC = () => {
  return (
    <VStack alignItems={'center'} w={'full'} justifyContent={'flex-start'}>
      <VStack
        textColor={'brand.300'}
        maxW={{ base: 'full', md: '50%' }}
        w={'full'}
      >
        <Box w={'full'} alignItems={'flex-start'}>
          <Text fontWeight={'bold'} fontSize={{ base: 12, md: 14 }}>
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
              title='Boards'
              description='Easy useable boards to manage your projects and tasks.'
              icon={MdSpaceDashboard}
            />

            <DropDownCard
              title='Groupings'
              description='Groupings make it easy to keep track of tasks and issues within a project.'
              icon={FaLayerGroup}
            />
          </VStack>
          <VStack py={6} alignItems={'flex-start'}>
            <DropDownCard
              title='Tickets'
              description='Tickets are a way to track issues and tasks within a project. There simple ui makes it easy to manage your tickets.'
              icon={IoTicketSharp}
            />

            <DropDownCard
              title='Comments'
              description='Comments allow you to talk with your fellow developers and customers.'
              icon={MdOutlineComment}
            />
          </VStack>
          <VStack py={6} alignItems={'flex-start'}>
            <DropDownCard
              title='Dashboard'
              description='The dashboard makes it easy to see your board and join different boards with a single click.'
              icon={FaProjectDiagram}
            />
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default FeaturesDropDown;

