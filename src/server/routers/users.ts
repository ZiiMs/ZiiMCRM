import * as trpc from '@trpc/server';

import { z } from 'zod';
import { Context } from '../context';

export const userRouter = trpc
  .router<Context>()
  .mutation('create', {
    input: z.object({
      age: z.number(),
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
    async resolve({ ctx }) {
      const user = await ctx.prisma.user.findFirstOrThrow({
        where: {
          id: ctx.session?.user.id,
        },
      });
      return user;
    },
  });

// export type definition of API

