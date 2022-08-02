import { prisma } from '@/utils/database';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = req && res && (await getServerSession(req, res, nextAuthOptions));
  console.log('createContext for', session?.user?.name ?? 'unknown user');
  return {
    req,
    res,
    prisma,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

