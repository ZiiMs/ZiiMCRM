import { Heading, HStack, VStack } from '@chakra-ui/react';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const drawer = true;
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
        <Heading color={'gray.200'}>Index</Heading>
      </VStack>
    </HStack>
  );
};

// export const getServerSideProps: GetServerSideProps<any> = async (context) => {
//   console.log(context.req);
//   const session = await unstable_getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   );
//   // const { setBoards } = await useContext(boardContext);
//   console.log('SESSION', session);
//   if (!session) return { props: { error: true } };

//   // console.log('Getting Data');
//   // const res = await fetch('/api/board/fetchBoards', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: JSON.stringify({
//   //     userId: session.user.id,
//   //   }),
//   // });
//   // const data = await res.json();
//   // if (data.error) {
//   //   return {
//   //     props: {
//   //       error: true,
//   //     },
//   //   };
//   // } else {
//   //   console.log(data.message);
//   //   console.log(data.boards);
//   //   // setBoards(data.boards);
//   //   return {
//   //     props: {},
//   //   };
//   }
// };

export default Home;

