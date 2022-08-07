import * as trpc from '@trpc/server';
import { useRouter } from 'next/router';

import { z } from 'zod';
import { createAuthRouter } from '../createAuthRouter';

export const userRouter = createAuthRouter()
  .mutation('create', {
    input: z.object({
      age: z.number().min(16).max(100),
      gender: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          age: input.age,
          gender: input.gender,
        },
      });

      return {
        user,
      };
    },
  })
  .query('get', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
      return user;
    },
  })
  .query('isRegistered', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
      const exists = user.age !== null && user.gender !== null;
      return exists;
    },
  });

// export type definition of API

