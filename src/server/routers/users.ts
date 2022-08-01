import * as trpc from '@trpc/server';

import { z } from 'zod';
import { Context } from '../context';

export const userRouter = trpc
  .router<Context>()
  .mutation('create', {
    input: z.object({
      age: z.number().min(16).max(100),
      gender: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
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
  });

// export type definition of API

