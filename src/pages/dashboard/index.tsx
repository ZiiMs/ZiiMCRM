import Layout from '@/components/layout';
import { createSSGHelpers } from '@trpc/react/ssg';
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType
} from 'next';
import React from 'react';
import { createContext } from 'src/server/context';
import { appRouter } from 'src/server/routers';
import superjson from 'superjson';

const DashBoardIndex: React.FC = () => {
  return (
    <Layout>
      <h1>DashBoard Index</h1>
    </Layout>
  );
};


export default DashBoardIndex;

